import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const getAllProductIds = async (
  organization_id: string,
  accessToken: string
) => {
  let page = 1;
  const size = 50;
  const allProductIds: string[] = [];
  let hasNextPage = true;

  while (hasNextPage) {
    const res = await fetch(
      `https://api.timbu.cloud/products?organization_id=${organization_id}&page=${page}&size=${size}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();

    const ids = data.items.map((product: Product) => product.id);
    allProductIds.push(...ids);

    hasNextPage = !!data.next_page;
    page += 1;
  }

  return allProductIds;
};

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const organization_id = searchParams.get('organization_id');

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (!organization_id) {
      return NextResponse.json(
        { message: 'Missing organization_id' },
        { status: 400 }
      );
    }

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Missing authorization token' },
        { status: 400 }
      );
    }

    const productIds = await getAllProductIds(organization_id, accessToken);

    // Fetch Stocks by Product IDs
    const stockRes = await fetch(
      `https://api.timbu.cloud/stocks/by-products?organization_id=${organization_id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_ids: productIds }),
      }
    );

    if (!stockRes.ok) {
      return NextResponse.json(
        { message: 'Failed to fetch stocks', status: stockRes.status },
        { status: stockRes.status }
      );
    }

    const stockData = await stockRes.json();

    return NextResponse.json(stockData, { status: stockRes.status });
  } catch (error: any) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error?.message || error },
      { status: 500 }
    );
  }
}

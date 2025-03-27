import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const organization_id = searchParams.get("organization_id");
    const date_range_start = searchParams.get("date_range_start");
    const date_range_end = searchParams.get("date_range_end");
    const sale_status = searchParams.get("sale_status");

    // Expecting product_ids as an array in the request body
    const { product_ids } = await req.json();

    if (!organization_id || !product_ids || product_ids.length === 0) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    // Fetch sales data for multiple products in parallel
    const results = await Promise.all(
      product_ids.map(async (product_id: string) => {
        const apiUrl = new URL("https://api.timbu.cloud/sales/weekday-count");

        apiUrl.searchParams.append("organization_id", organization_id);
        apiUrl.searchParams.append("product_id", product_id);
        if (date_range_start)
          apiUrl.searchParams.append("date_range_start", date_range_start);
        if (date_range_end)
          apiUrl.searchParams.append("date_range_end", date_range_end);
        if (sale_status) apiUrl.searchParams.append("sale_status", sale_status);

        const response = await fetch(apiUrl.toString(), {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          return { product_id, error: `Failed: ${response.status}` };
        }

        return { product_id, sales: await response.json() };
      })
    );

    return NextResponse.json(results);
  } catch (error: any) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

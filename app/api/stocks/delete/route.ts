import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  try {
    const token = req.headers.get('authorization');

    const body = await req.json();
    const stock_id = body.stock_id;
    const organization_id = body.organization_id;
    if (!stock_id) {
      return NextResponse.json(
        { message: 'Stock ID is required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.timbu.cloud/stocks/${stock_id}?organization_id=${organization_id}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    return NextResponse.json(
      { message: 'Stock deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

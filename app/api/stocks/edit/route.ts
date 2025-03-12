import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
      const token = req.headers.get("authorization");
      const organization_id = "160db8736a9d47989381e01a987e4413"; 
      
      const body = await req.json();
      const stock_id = body.stock_id;
  
      if (!stock_id) {
        return NextResponse.json({ message: "Stock ID is required" }, { status: 400 });
      }
  
      const response = await fetch(
        `https://api.timbu.cloud/stocks/${stock_id}`, 
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            organization_id: organization_id, 
            name: body.name,
            buying_price: body.buying_price,
            quantity: body.quantity,
            currency_code: body.currency_code,
          }),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json(errorData, { status: response.status });
      }
  
      return NextResponse.json({ message: "Stock updated successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Internal Server Error", error: error instanceof Error ? error.message : error },
        { status: 500 }
      );
    }
  }
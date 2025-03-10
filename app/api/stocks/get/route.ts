import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("authorization");

    const product_id = "79dc8c9167fe48e39ee3088bff7f9d3f";
    const organization_id = "160db8736a9d47989381e01a987e4413";

    const response = await fetch(
      `https://api.timbu.cloud/stocks?product_id=${product_id}&organization_id=${organization_id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

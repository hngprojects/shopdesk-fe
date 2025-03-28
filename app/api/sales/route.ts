import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { organization_id, customer_id, currency_code, products_sold } = body;

    if (
      !organization_id ||
      !customer_id ||
      !currency_code ||
      !Array.isArray(products_sold) ||
      products_sold.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields or products_sold must be a non-empty array",
        },
        { status: 400 }
      );
    }

    for (const product of products_sold) {
      const { product_id, amount, quantity, currency_code } = product;
      if (
        !product_id ||
        typeof amount !== "number" ||
        typeof quantity !== "number" ||
        !currency_code
      ) {
        return NextResponse.json(
          {
            error:
              "Each product_sold must have a valid product_id, amount (float), quantity (float), and currency_code",
          },
          { status: 400 }
        );
      }
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Unauthorized: Missing access token" },
        { status: 401 }
      );
    }

    const apiUrl = "https://api.timbu.cloud/sales";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        organization_id,
        customer_id,
        currency_code,
        products_sold,
      }),
    });
    console.log("response:", response);
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to create sale: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in creating sale:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

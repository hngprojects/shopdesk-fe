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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const organization_id = searchParams.get("organization_id");
    const date_time = searchParams.get("date_time") || getThisWeek();
    const page = searchParams.get("page") || "1";
    const size = searchParams.get("size") || "50";
    const filter = searchParams.get("filter") || "all";
    const my_sales = searchParams.get("my_sales") || "false";
    const sorting_key = searchParams.get("sorting_key") || "date_created_db";
    const reverse_sort = searchParams.get("reverse_sort") || "true";
    const use_db = searchParams.get("use_db") || "true";

    if (!organization_id || !date_time) {
      return NextResponse.json(
        { error: "Missing required fields: organization_id and date_time" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Unauthorized: Missing access token" },
        { status: 401 }
      );
    }

    const apiUrl = `https://api.timbu.cloud/sales?organization_id=${organization_id}&date_time=${date_time}&page=${page}&size=${size}&filter=${filter}&my_sales=${my_sales}&sorting_key=${sorting_key}&reverse_sort=${reverse_sort}&use_db=${use_db}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch sales: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching sales:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

function getThisWeek() {
  const today = new Date();
  const firstDayOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay())
  );
  return firstDayOfWeek.toISOString().split("T")[0];
}

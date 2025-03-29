import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function generateRandomName(length = 8) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const organization_id = searchParams.get("organization_id");

    if (!organization_id) {
      return NextResponse.json(
        { error: "Missing required organization_id parameter" },
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

    const apiUrl = new URL("https://api.timbu.cloud/customers");
    apiUrl.searchParams.append("organization_id", organization_id);

    // Add only if present in the query params
    ["sorting_key", "page", "size", "reverse_sort", "use_db"].forEach(
      (param) => {
        const value = searchParams.get(param);
        if (value) apiUrl.searchParams.append(param, value);
      }
    );

    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch customers: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in fetching customers:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const organization_id = searchParams.get("organization_id");

    if (!organization_id) {
      return NextResponse.json(
        { error: "Missing required organization_id parameter" },
        { status: 400 }
      );
    }

    // const body = await req.json();
    const first_name = generateRandomName();
    const last_name = generateRandomName();
    console.log(first_name, last_name);
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Unauthorized: Missing access token" },
        { status: 401 }
      );
    }

    const apiUrl = new URL("https://api.timbu.cloud/customers");

    const response = await fetch(apiUrl.toString(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name, organization_id }),
    });
    console.log("response", response);
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to create customer: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in creating customer:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest
): Promise<NextResponse<{ message: string }>> {
  const baseUrl = "https://api.timbu.cloud/prices";
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const { searchParams } = new URL(request.url);
  const product_id = searchParams.get("product_id");
  const organization_id = searchParams.get("organization_id");
  if (!product_id || !organization_id)
    return NextResponse.json(
      { message: "Missing product ID or organization ID" },
      { status: 400 }
    );
  try {
    const response = await fetch(
      `${baseUrl}?product_id=${product_id}&organization_id=${organization_id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return handleResponse(response);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const baseUrl = "https://api.timbu.cloud/prices";
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const requestBody = await request.json();
  if (!requestBody)
    return NextResponse.json({ message: "No request body." }, { status: 400 });
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });
    return handleResponse(response);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

async function handleResponse(
  response: Response
): Promise<NextResponse<{ message: string }>> {
  if (!response.ok)
    return NextResponse.json(
      { message: "Post Request failed with status " + response.status },
      { status: response.status }
    );
  const data = await response.json();
  return NextResponse.json(data);
}

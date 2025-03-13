import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiUrl = "https://api.timbu.cloud/email/send";
  try {
    const data = await request.json();
    if (!data)
      return NextResponse.json({ error: "Data not found" }, { status: 401 });
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok)
      return NextResponse.json(
        { error: "Request failed with status" + response.status },
        { status: response.status }
      );
    return NextResponse.json(await response.json(), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

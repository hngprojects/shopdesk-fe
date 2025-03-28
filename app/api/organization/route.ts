import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { refreshAccessToken } from "@/lib/refresh";

export async function GET(req: NextRequest) {
  const apiUrl = "https://api.timbu.cloud/organizations";
  let accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }
  console.log(accessToken);
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
    if (!response.ok)
      return NextResponse.json(
        { error: "Request failed with Status: " + response.status },
        { status: response.status }
      );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

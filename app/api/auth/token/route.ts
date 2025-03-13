import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { refreshAccessToken } from "@/lib/refresh";

export async function GET() {
  let accessToken = (await cookies()).get("access_token")?.value;
  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }
  return NextResponse.json({ accessToken });
}

import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/refresh";

export async function GET() {
  try {
    const newAccessToken = await refreshAccessToken();
    return NextResponse.json({
      message: "Access token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Access token refresh failed",
      },
      { status: 401 }
    );
  }
}

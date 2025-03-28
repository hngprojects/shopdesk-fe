// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const token = req.headers.get("authorization");

//     const response = await fetch("https://api.timbu.cloud/organizations", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `${token}`,
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       return NextResponse.json(
//         { message: "Create Organization failed", error: await response.json() },
//         { status: response.status }
//       );
//     }

//     const data = await response.json();
//     return NextResponse.json(data, { status: response.status });
//   } catch (error: any) {
//     return NextResponse.json(
//       { message: "Internal Server Error", error: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const token = req.headers.get("authorization");

    // 🔍 Log request data for debugging
    console.log("🚀 Request Body:", body);
    console.log("🔑 Token:", token);

    // Validate token before making the request
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: Token missing" },
        { status: 401 }
      );
    }

    const response = await fetch("https://api.timbu.cloud/organizations", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();

      return NextResponse.json(
        { message: "Create Organization failed", error: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("🔥 Internal Server Error:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

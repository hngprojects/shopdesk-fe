import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function POST() {
 try {
   const cookieStore = await cookies();


   const refresh_token = cookieStore.get("refresh_token")?.value;
   const access_token = cookieStore.get("access_token")?.value;


   if (!refresh_token) {
     return NextResponse.json({ message: "Refresh token is missing" }, { status: 400 });
   }
   if (!access_token) {
     return NextResponse.json({ message: "Access token is missing" }, { status:400 });
   }


   const response = await fetch("https://api.timbu.cloud/auth/logout", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${refresh_token}`,
     },
   });


   const data = await response.json();


   if (!response.ok) {
     console.log(data.message, data.detail , "Logout failed");
   }


   await cookieStore.delete("refresh_token");
   await cookieStore.delete("access_token");


   return NextResponse.json({ message: "User logged out successfully" });
 } catch (error: any) {
   return NextResponse.json({ message: error.message || "An error occurred" }, { status: 500 });
 }
}

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    const { firstName, lastName, email, phone, message } = formData;

    console.log(formData);

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const payload = {
      name: `${firstName} ${lastName}`,
      email,
      subject: "Buying ShopDesk Proposal",
      message: `${message}\n\nPhone: ${phone || "Not provided"}`,
    };

    const res = await fetch("https://api.timbu.cloud/contactus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to submit");
    }

    return NextResponse.json(
      { success: "Your message has been sent!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
}

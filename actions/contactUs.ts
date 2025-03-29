"use server";

export async function submitContactForm(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  if (!firstName || !lastName || !email || !message) {
    return { error: "All fields are required." };
  }

  try {
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

    if (!res.ok) throw new Error("Failed to submit");

    return { success: "Your message has been sent!" };
  } catch (error) {
    return { error: "Something went wrong, please try again." };
  }
}

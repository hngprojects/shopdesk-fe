import { loginEmailBody } from "@/lib/utils";

export async function sendLoginEmail(
  email: string,
  first_name: string,
  last_name: string
): Promise<string> {
  if (!first_name) first_name = "";
  if (!last_name) last_name = "";
  const apiUrl = "api/email/login";
  const body = JSON.stringify({
    subject: "",
    title: " Login Successful – Welcome Back to ShopDesk",
    recipients: [email],
    first_name: "user",
    body: loginEmailBody(first_name, last_name),
  });
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (!response.ok) {
      throw new Error("Failed to send email");
    }
    return "Email sent successfully";
  } catch (error) {
    console.error("Error sending login email:", error);
    return "Error sending login email";
  }
}

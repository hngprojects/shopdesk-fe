import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function loginEmailBody(first_name: string, last_name: string) {
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Welcome to ShopDesk</title>
</head>

<body style="margin:0; padding:0; width:100%; font-family: 'Open Sans', Arial, sans-serif; background-color: #ffffff;">

  <!-- Logo -->
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" style="padding-top: 40px;">
    <tr>
      <td align="center">
        <table cellspacing="0" cellpadding="0" border="0" align="center">
          <tr>
            <td>
              <img src="https://i.postimg.cc/X7Skmq3Y/box-minimalistic-svgrepo-com-1.png" alt="ShopDesk Logo" width="40" height="40" style="display: block;">
            </td>
            <td style="font-size: 32px; color: #1b1b1b; font-weight: 600; padding-left: 8px;">ShopDesk</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Header -->
  <table width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <h1 style="margin: 0; font-size: 32px; line-height: 44px; color: #1b1b1b; font-weight: 700; text-align: center;">
          Login Successful – Welcome Back to ShopDesk
        </h1>
      </td>
    </tr>
  </table>

  <!-- Main Content -->
  <table width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center">
        <table width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; padding: 0 16px;">
          <tr>
            <td style="font-size: 16px; line-height: 24px; color: #1b1b1b;">
              <p style="margin-bottom: 15px; color: #1b1b1b;">Hi ${first_name} ${last_name},</p>
              <p  style="margin-bottom: 15px; color: #1b1b1b;">Welcome to <span style="color: #006716;">ShopDesk</span> – your login was successful!</p>
              <p style="color: #1b1b1b;">You can now access your dashboard to streamline your retail operations.</p>

              <!-- Image -->
              <img src="https://i.postimg.cc/GmfgkwdM/Frame-2147226823.png" alt="Team illustration" width="100%" style="border-radius: 12px; margin: 30px 0;">

              <!-- Features -->
              <h3 style="font-size: 24px; line-height: 36px; font-weight: 600; margin-bottom: 20px; color: #1b1b1b">
                Here’s a sneak peek at what’s waiting for you:
              </h3>
              <p style="color: #1b1b1b">✅ <strong>Stock Inventory Management:</strong> Keep track of every item so you always know what’s in stock and what’s running low.</p>
              <p style="color: #1b1b1b">✅ <strong>Edit Stock Details:</strong> Input your product details and explore the option of adding or removing a product and editing the details of a product to correct an error.</p>

              <p style="color: #1b1b1b; margin-top: 30px;">If you did not initiate this login, please contact support immediately at
                <a href="mailto:shopdeskhng@outlook.com" style="color: #006716; text-decoration: none;">
                  shopdeskhng@outlook.com
                </a>.
              </p><br>

              <p style="color: #1b1b1b; margin-bottom: 15px;">Here’s to smoother operations and happier customers!</p>
              <p style="color: #1b1b1b; margin-bottom: 15px;">P.S. Keep an eye on your inbox – we’ll be sharing tips and tricks to help you make the most of ShopDesk. </p>
              <p style="color: #1b1b1b; margin-bottom: 25px;">Thank you for choosing ShopDesk!</p>

              <p style="color: #1b1b1b">Best regards,</p>
              <p style="color: #006716; font-weight: 600; margin-top: 0px;">ShopDesk Team</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#e5f5ed">
    <tr>
      <td align="center" style="padding: 55px 16px 30px;">
        <!-- Footer Logo -->
        <table cellspacing="0" cellpadding="0" border="0" align="center">
          <tr>
            <td>
              <img src="https://i.postimg.cc/X7Skmq3Y/box-minimalistic-svgrepo-com-1.png" alt="ShopDesk Logo" width="28" height="28" style="display: block;">
            </td>
            <td style="font-size: 24px; color: #1b1b1b; font-weight: 600; padding-left: 8px;">ShopDesk</td>
          </tr>
        </table>

        <!-- Social Icons -->
        <table cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 20px 0;">
          <tr>
            <td style="margin-right: 20px;">
              <a href="https://twitter.com" style="margin-right: 20px;">
                <img src="https://i.postimg.cc/h4702xkY/logo-twitter-2.png" alt="Twitter" width="24" height="24" style="border-radius: 50%; padding: 5px; background-color: #006716;">
              </a>
            </td>
            <td style="margin-right: 20px;">
              <a href="https://facebook.com" style="margin-right: 20px;">
                <img src="https://th.bing.com/th/id/R.ea9f4390e665088d4b9acb45a59f7cb1?rik=JOW0PUjPgOdLNQ&pid=ImgRaw&r=0" alt="Facebook" width="24" height="24" style="border-radius: 50%; padding: 5px; background-color: #006716;">
              </a>
            </td>
            <td style="margin-right: 20px;">
              <a href="https://instagram.com" style="margin-right: 20px;">
                <img src="https://i.postimg.cc/MHRbX20w/logo-instagram-1-1.png" alt="Instagram" width="24" height="24" style="border-radius: 50%; padding: 5px; background-color: #006716;">
              </a>
            </td>
            <td style="margin-right: 20px;">
              <a href="https://github.com" style="margin-right: 20px;">
                <img src="https://i.postimg.cc/fLVvn0JJ/logo-github-1-1.png" alt="GitHub" width="24" height="24" style="border-radius: 50%; padding: 5px; background-color: #006716;">
              </a>
            </td>
          </tr>
        </table>

        <!-- Footer Text -->
        <p style="color: #706F6F; font-size: 14px; line-height: 1.6;">
          &copy; 2025 ShopDesk | Powered by Timbu Business
        </p>

        <!-- Footer Links -->
        <p style="color: #706F6F; font-size: 14px; line-height: 1.6;">
          <a href="#" style="color: #706F6F; text-decoration: none; margin: 0 8px;">Cookies</a> 
          <a href="#" style="color: #706F6F; text-decoration: none; margin: 0 8px;">Terms of Service</a> 
          <a href="#" style="color: #706F6F; text-decoration: none; margin: 0 8px;">Privacy Policy</a>
        </p>

      </td>
    </tr>
  </table>

</body>

</html>`;
}

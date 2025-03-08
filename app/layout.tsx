import type { Metadata } from "next";
import "@/styles/globals.css";

const APP_URL = "https://www.shopdesk.im";
const APP_NAME = "ShopDesk";
const creator = `HNG12-${APP_NAME}`;

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${APP_NAME} - Effortless Shop Management!`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    "A powerful yet easy-to-use platform for managing your shop. Track inventory, process sales, and get real-time insights to grow your business.",
  keywords: [
    "shop management",
    "inventory tracking",
    "POS system",
    "sales analytics",
    "business software",
    "retail management",
    "store operations",
  ],
  authors: [{ name: creator }],
  creator,
  publisher: creator,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} - Simplify Your Shop Management`,
    description:
      "Manage your inventory, sales, and reports with ease. ShopDesk provides seamless business tools for retailers and shop owners.",
    images: [
      {
        url: `${APP_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${APP_NAME} - Simplify Your Shop Management`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} - Simplify Your Shop Management`,
    description:
      "Manage your inventory, sales, and reports with ease. ShopDesk provides seamless business tools for retailers and shop owners.",
    creator,
    images: [`${APP_URL}/twitter-image.jpg`],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [
      { url: "/apple-touch-icon.png" },
      // { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      // { url: "/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  applicationName: APP_NAME,
  category: "Business & Productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

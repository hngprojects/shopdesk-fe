export interface PriceCardContentOptions {
    plan: string;
    monthlyPrice: string;
    annualPrice: string;
    monthlyLink: string;
    annualLink: string;
    item: string[];
  }

export const priceCardContent: PriceCardContentOptions[] = [
    {
      plan: "Free Plan",
      monthlyPrice: "$0",
      annualPrice: "$0/year",
      monthlyLink: "#",
      annualLink: "#",
      item: [
        "Track up to 50 items in stock.",
        "Basic sales and profit tracking.",
        "Basic sales and profit tracking.",
        "Single user (admin role only)"
      ],
    },
    {
      plan: "Basic Plan",
      monthlyPrice: "$30",
      annualPrice: "$300/Year",
      monthlyLink: "https://buy.stripe.com/4gw3gbgEw5644243cQ",
      annualLink: "https://buy.stripe.com/4gweYTewo7ec7eg6p3",
      item: [
        "Unlimited items in stock.",
        "Export daily/weekly reports",
        "3 users (admin + 2 staff)",
        "Priority email support",
      ],
    },
    {
      plan: "Premium Plan",
      monthlyPrice: "$50",
      annualPrice: "$500/Year",
      monthlyLink: "https://buy.stripe.com/eVa2c7cog7ecbuw00G",
      annualLink: "https://buy.stripe.com/fZe5oj5ZSbus568aFl",
      item: [
        "Unlimited users and roles.",
        "Bulk import/export for stock",
        "Compliance audits (GDPR)",
        "Dedicated account manager",
      ],
    },
  ];
import { Metadata } from "next";
import Pricing from "./_components/Pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Explore our flexible pricing plans tailored to fit your business needs. Choose the perfect plan to manage your inventory, sales, and operations with ShopDesk.",
};

const PricingPage = () => {
  return <Pricing />;
};

export default PricingPage;


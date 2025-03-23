import { Metadata } from "next";
import Policy from "./policyComponent";

export const metadata: Metadata = {
  title: "Policy",
  description:
    "Learn about ShopDesk's terms of service, privacy policies, and guidelines for using our business inventory management solution.",
};

const PolicyPage = () => {
  return <Policy />;
};

export default PolicyPage;

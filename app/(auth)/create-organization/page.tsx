import { Metadata } from "next";
import CreateOrganization from "./_components/CreateOrganization";

export const metadata: Metadata = {
  title: "Create Organization",
  description:
    "Set up your organization to start managing your business with ShopDesk.",
};

const CreateOrganizationPage = () => {
  return <CreateOrganization />;
};

export default CreateOrganizationPage;

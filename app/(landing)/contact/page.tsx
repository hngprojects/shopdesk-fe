import { Metadata } from "next";
import Contact from "./Contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the ShopDesk team for support, sales inquiries, or feedback about our business inventory management solution.",
};

const ContactPage = () => {
  return <Contact />;
};

export default ContactPage;

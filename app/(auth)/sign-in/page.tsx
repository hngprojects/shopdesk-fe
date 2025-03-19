import { Metadata } from "next";
import SignIn from "./_components/SignIn";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Access your ShopDesk account to manage your business, inventory, and sales in one place",
};

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;



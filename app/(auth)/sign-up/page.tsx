import { Metadata } from "next";
import SignUp from "./_components/SignUp";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create an account to get started with ShopDesk",
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;

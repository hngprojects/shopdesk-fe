import { Metadata } from "next";
import Blog from "./_components/Blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read our latest articles, news, and updates from ShopDesk",
};

const BlogPage = () => {
  return <Blog />;
};

export default BlogPage;

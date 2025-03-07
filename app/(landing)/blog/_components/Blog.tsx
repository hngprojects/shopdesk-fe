"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Thumbnail1 from "@/public/blog-images/thumbnail-1.png";
import Thumbnail2 from "@/public/blog-images/thumbnail-2.png";
import Thumbnail3 from "@/public/blog-images/thumbnail-3.png";
import BlogCard from "./BlogCard";

const blogPosts = [
  {
    id: "simplify-product-management",
    imageSrc: Thumbnail1,
    category: "Inventory Management",
    readTime: "3 min read",
    title: "Simplify Your Product Management with Shopdesk",
    excerpt:
      "Managing your inventory and product listings shouldn't be a hassle. With Shopdesk, you can effortlessly add...",
    author: "Shopdesk",
    date: "17 Feb 2025",
  },
  {
    id: "seamless-order-management",
    imageSrc: Thumbnail2,
    category: "Order Management",
    readTime: "4 min read",
    title: "Seamless Order Management for Growing Businesses",
    excerpt:
      "Tired of juggling orders manually? Shopdesk helps you stay on top of every sale, from inquiry to fulfillment...",
    author: "Shopdesk",
    date: "17 Feb 2025",
  },
  {
    id: "grow-business-analytics",
    imageSrc: Thumbnail3,
    category: "Inventory Management",
    readTime: "5 min read",
    title: "Grow Your Business with Smarter Analytics",
    excerpt:
      "Selling on social media is no longer just about posting product pictures and waiting for customers to DM you. Shopdesk...",
    author: "Shopdesk",
    date: "17 Feb 2025",
  },
];

const categories = [
  "All",
  "Inventory Management",
  "Order Management",
  "Business Growth",
  "Reports & Analytics",
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-6 mb-20">
      {/* header */}
      <div className="lg:h-[322px] max-w-3xl mx-auto py-12 flex flex-col gap-12">
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#101828]">
            Blog
          </h1>
          <p className="text-[#717171] text-sm sm:text-base lg:text-lg">
            Stay ahead with expert insights on inventory management, and
            business growth.
          </p>
        </div>

        {/* search */}
        <form className="flex flex-wrap gap-4 md:items-center justify-center w-full max-w-2xl mx-auto">
          <input
            type="text"
            name="search"
            className="max-w-[425px] w-full rounded-[9px] p-4 outline-none border border-[#A0A0A0] focus:border-black placeholder:text-[#B8B8B8] lg:text-xl"
            placeholder="Search for articles"
            required
          />
          <button
            type="submit"
            className="bg-[#009A49] text-xl py-3 px-6 font-medium text-[#FFFFFF] rounded-[9px]"
          >
            Search
          </button>
        </form>
      </div>

      <main className="flex flex-col gap-14">
        <Tabs
          defaultValue="All"
          className="w-full bg-white"
          onValueChange={setSelectedCategory}
        >
          <TabsList className="flex gap-4 mb-8 justify-start md:justify-center bg-white overflow-x-auto whitespace-nowrap w-full scrollbar-hide">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white bg-white py-3 px-6 font-medium text-[#2A2A2A] rounded-2xl md:rounded-full border border-[#1b1b1b] cursor-pointer"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value={selectedCategory}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 gap-y-6"
          >
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </TabsContent>
        </Tabs>

        <button
          type="button"
          className="text-white bg-[#2A2A2A] border border-[#1B1B1B] py-3 px-14 font-medium rounded-xl w-max mx-auto"
        >
          Load more
        </button>
      </main>
    </section>
  );
};

export default Blog;

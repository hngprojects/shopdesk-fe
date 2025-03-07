import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface BlogCardProps {
  id: string;
  imageSrc: string | StaticImageData;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  imageSrc,
  category,
  readTime,
  title,
  excerpt,
  author,
  date,
}) => {
  return (
    <div className="border border-[#F1F1F1] rounded-md p-4 md:p-6 py-6 lg:px-7 flex flex-col gap-6 group max-w-[374px] mx-auto">
      <div className="overflow-hidden rounded-md">
        <Image
          src={imageSrc}
          alt="thumbnail"
          className="rounded-md object-cover group-hover:scale-105 duration-300"
          width={318}
          height={163}
          quality={90}
          priority
        />
      </div>

      <div className="flex flex-col gap-4 text-[#2A2A2A] text-base">
        <div className="text-sm flex items-center gap-2">
          <p>{category}</p>
          <span className="rounded-full size-1.5 bg-[#80CCA4]" />
          <p>{readTime}</p>
        </div>

        <span className="flex flex-col gap-3">
          <Link href={`/blog/${id}`} className="hover:underline duration-200">
            <h3 className="font-medium md:text-2xl">{title}</h3>
          </Link>
          <p>{excerpt}</p>
        </span>

        <span>
          <p className="font-medium">{author}</p>
          <p className="text-[#717171]">{date}</p>
        </span>
      </div>
    </div>
  );
};

export default BlogCard;

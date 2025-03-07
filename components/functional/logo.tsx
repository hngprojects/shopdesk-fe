import Image from "next/image";
import Link from "next/link";
import logo from "@/public/shopdesk-logo.svg";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-4">
      <Image
        src={logo}
        alt="ShopDesk logo"
        className=""
        width={173}
        height={30}
        quality={90}
        priority
      />
    </Link>
  );
};

export default Logo;

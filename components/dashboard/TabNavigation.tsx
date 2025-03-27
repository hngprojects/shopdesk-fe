"use client";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TabNavigation = () => {
  const pathname = usePathname();

  const tabs = [
    {
      name: "Stock",
      path: "/stock",
      icon: (
        <Icons.Stock
          className="w-5 h-5"
          strokeColor={pathname === "/stock" ? "#009A49" : "#83838B"}
        />
      ),
    },
    {
      name: "Sales",
      path: "/sales",
      icon: (
        <Icons.Sales
          className="w-5 h-5"
          strokeColor={pathname === "/sales" ? "#009A49" : "#83838B"}
        />
      ),
    },
    {
      name: "Reports",
      path: "/reports",
      icon: (
        <Icons.Reports
          className="w-5 h-5"
          strokeColor={pathname === "/reports" ? "#009A49" : "#83838B"}
        />
      ),
    },
  ];

  return (
    <div className="w-full flex border border-b-0 max-w-fit rounded-t-lg  bg-[#F6F8FA] p-1 pb-0">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;

        return (
          <Link
            key={tab.name}
            href={tab.path}
            className="relative last:before:absolute last:before:-bottom-1 last:before:content-[''] last:before:w-3 last:before:h-1.5 last:before:bg-white last:before:-right-1"
          >
            <div
              className={`flex items-center justify-center relative gap-2 py-2 w-44 max-[800px]:w-full font-semibold px-9 ${
                isActive
                  ? 'bg-white  rounded-t-lg after:absolute after:content-[""] after:w-full after:h-5 after:bg-white after:-bottom-2 '
                  : ""
              } ${
                !isActive
                  ? "after:absolute  after:content-[''] after:w-full after:h-1.5 after:bg-white after:-bottom-1 "
                  : ""
              }`}
            >
              <span className={isActive ? "text-[#2A2A2A]" : "text-[#83838b]"}>
                {tab.name}
              </span>
              {tab.icon}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TabNavigation;

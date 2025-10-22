"use client";

import NavItem from "@/app/_components/NavItem";
import { sideNavSections } from "@/app/_helpers/appConstants";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  let pathname = usePathname();
  const split = pathname.split("/");
  if (split.length > 1) pathname = `/${split[1]}`;

  return (
    <div className="p-5 flex flex-col justify-between bg-primary-800 h-full">
      <div className="flex flex-col gap-2">
        {sideNavSections.map((section) => (
          <NavItem
            href={section.href}
            active={section.href === pathname}
            key={section.href}
          >
            {section.text}
          </NavItem>
        ))}
      </div>
    </div>
  );
}

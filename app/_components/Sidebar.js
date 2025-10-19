"use client";

import NavItem from "@/app/_components/NavItem";
import { sideNavSections } from "@/app/_helpers/appConstants";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="p-5 flex flex-col justify-between bg-primary-800 h-full">
      <div className="flex flex-col gap-2">
        {sideNavSections.map((section) => (
          <NavItem
            href={section.href}
            active={pathname === section.href}
            key={section.href}
          >
            {section.text}
          </NavItem>
        ))}
      </div>
    </div>
  );
}

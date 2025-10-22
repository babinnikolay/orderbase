import Link from "next/link";

export default function NavItem({ href, active, children }) {
  return (
    <Link
      className={`p-[10px_15px] rounded-xl cursor-pointer text-primary-100 hover:bg-primary-400 ${active ? "bg-primary-700" : ""}`}
      href={href}
    >
      {children}
    </Link>
  );
}

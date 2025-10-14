import Link from "next/link";

export default function NavItem({ dataSection, children }) {
  return (
    <Link
      className="p-[10px_15px] rounded-x8 cursor-pointer text-primary-100 hover:bg-accent-600"
      href={`/${dataSection}`}
    >
      {children}
    </Link>
  );
}

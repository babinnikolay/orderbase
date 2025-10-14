import NavItem from "@/app/_components/NavItem";

export default function Sidebar() {
  const sections = [
    {
      dataSection: "dashboard",
      text: "📊 Dashboard",
    },
    {
      dataSection: "orders",
      text: "📋 Orders",
    },
    {
      dataSection: "invoices",
      text: "🧾 Invoices",
    },
    {
      dataSection: "clients",
      text: "👥 Clients",
    },
    {
      dataSection: "reports",
      text: "📈 Reports",
    },
    {
      dataSection: "account",
      text: "⚙️ Account",
    },
  ];

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        {sections.map((section) => (
          <NavItem dataSection={section.dataSection} key={section.dataSection}>
            {section.text}
          </NavItem>
        ))}
      </div>
    </div>
  );
}

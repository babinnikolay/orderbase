// app/debug-db/page.js
export const dynamic = "force-dynamic";

export default async function DebugDBPage() {
  console.log("=== DEBUG DB PAGE: START ===");

  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();

    console.log("=== DEBUG DB: Prisma created ===");

    const clients = await prisma.client.findMany();
    console.log("=== DEBUG DB: Found clients:", clients.length);

    await prisma.$disconnect();

    return (
      <div>
        <h1>Database Debug</h1>
        <div style={{ background: "lightgreen", padding: "1rem" }}>
          <strong>SUCCESS: Found {clients.length} clients in database</strong>
        </div>
        <pre>{JSON.stringify(clients, null, 2)}</pre>
      </div>
    );
  } catch (error) {
    console.log("=== DEBUG DB: ERROR ===", error.message);

    return (
      <div>
        <h1>Database Debug</h1>
        <div style={{ background: "red", color: "white", padding: "1rem" }}>
          <strong>ERROR: {error.message}</strong>
        </div>
      </div>
    );
  }
}

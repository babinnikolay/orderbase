import { NextResponse } from "next/server";
import { getClients } from "@/app/_lib/data-service";

export async function GET() {
  console.log("🔴 FORCE LOG: This should appear in docker logs!");
  console.log(
    "🔴 FORCE LOG: DATABASE_URL =",
    process.env.DATABASE_URL ? "SET" : "NOT SET",
  );

  const clients = await getClients();

  return NextResponse.json({ clients });
}

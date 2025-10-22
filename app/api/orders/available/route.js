import { getAvailableOrders } from "@/app/_lib/data-service";

export async function GET() {
  try {
    const orders = await getAvailableOrders();
    return Response.json(orders);
  } catch (error) {
    return Response.json({ message: error.message });
  }
}

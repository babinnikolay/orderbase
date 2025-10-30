import { getAvailableOrders } from "@/app/_lib/data-service";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get("clientId");

    if (clientId) {
      const orders = await getAvailableOrders(clientId);
      return Response.json(orders);
    }
  } catch (error) {
    throw error;
  }
}

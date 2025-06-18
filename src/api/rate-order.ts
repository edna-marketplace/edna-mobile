import { api } from "@/lib/axios";

export async function rateOrder(orderId: string, rating: number) {
  try {
    await api.patch(`/orders/rate/${orderId}/${rating}`);
  } catch (error) {
    throw error;
  }
}

import { api } from "@/lib/axios";

export async function createOrder(clotheId: string, paymentIntentId: string) {
  try {
    await api.post(`/orders`, {
      clotheId,
      paymentIntentId,
    });
  } catch (error) {
    throw error;
  }
}

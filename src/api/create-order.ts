import { api } from "@/lib/axios";

export async function createOrder(clotheId: string, paymentIntentId: string) {
  try {
    console.log(clotheId, paymentIntentId);
    await api.post(`/orders`, {
      clotheId,
      paymentIntentId,
    });
  } catch (error) {
    throw error;
  }
}

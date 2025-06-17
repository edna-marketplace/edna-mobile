import { api } from "@/lib/axios";

export async function createOrder(clotheId: string) {
  try {
    await api.post(`/orders/${clotheId}`);
  } catch (error) {
    throw error;
  }
}

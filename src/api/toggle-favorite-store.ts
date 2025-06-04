import { api } from "@/lib/axios";

export async function toggleFavoriteStore(storeId: string) {
  await api.post(`/customers/favorite-store/${storeId}`);
}

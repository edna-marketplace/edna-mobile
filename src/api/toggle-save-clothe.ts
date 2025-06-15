import { api } from "@/lib/axios";

export async function toggleSaveClothe(clotheId: string) {
  await api.post(`/customers/save-clothe/${clotheId}`);
}

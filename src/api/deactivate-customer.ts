import { api } from "@/lib/axios";
import { storageAuthTokenRemove } from "@/storage/storageAuthToken";

export async function deleteCustomer() {
  try {
    await api.delete("/customers");

    storageAuthTokenRemove();
  } catch (error) {
    throw error;
  }
}

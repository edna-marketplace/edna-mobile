import { StoreDetailsDTO } from "@/dtos/StoreDetailsDTO";
import { api } from "@/lib/axios";

export async function getStoreById(id: string): Promise<StoreDetailsDTO> {
  try {
    const response = await api.get(
      `/stores/${id}?latitude=-27.6037412&longitude=-48.5516699`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

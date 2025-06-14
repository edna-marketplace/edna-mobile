import { ClotheDetailsDTO } from "@/dtos/ClotheDetailsDTO";
import { api } from "@/lib/axios";

export async function getClotheById(id: string): Promise<ClotheDetailsDTO> {
  try {
    const response = await api.get(`/clothes/${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}

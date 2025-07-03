import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import { api } from "@/lib/axios";

export type FetchClothesBody = {
  name?: string;
  category?: string;
  categoryOther?: string;
  gender?: string;
  brand?: string;
  size?: string;
  storeId?: string;
  isSaved?: boolean;
  page?: number;
  limit?: number;
};

export type FetchClothesResponse = {
  clothes: ClotheSummaryDTO[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
};

export async function fetchClothesWithFilter(
  filters: FetchClothesBody
): Promise<FetchClothesResponse> {
  try {
    const response = await api.post("/clothes/filter", filters);

    return response.data;
  } catch (error) {
    throw error;
  }
}

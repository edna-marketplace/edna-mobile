import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import { api } from "@/lib/axios";

export type FetchFeedClothesBody = {
  page?: number;
  limit?: number;
};

export type FetchFeedClothesResponse = {
  clothes: ClotheSummaryDTO[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
};

export async function fetchFeedClothes(
  filters: FetchFeedClothesBody
): Promise<FetchFeedClothesResponse> {
  try {
    const response = await api.post("/clothes/feed", filters);

    return response.data;
  } catch (error) {
    throw error;
  }
}

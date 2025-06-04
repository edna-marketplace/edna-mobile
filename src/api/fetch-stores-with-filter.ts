import { StoreSummaryDTO } from "@/dtos/StoreSummaryDTO";
import { api } from "@/lib/axios";

export type FetchStoresBody = {
  name?: string;
  targetCustomer?: string;
  isFavorite?: boolean;
};

export type FetchStoresResponse = {
  stores: StoreSummaryDTO[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
};

export async function fetchStoresWithFilter(
  filters: FetchStoresBody
): Promise<FetchStoresResponse> {
  try {
    const response = await api.post(
      "/stores/filter?latitude=-27.6037412&longitude=-48.5516699",
      filters
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

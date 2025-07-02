import { api } from "@/lib/axios";

export type GetClotheRankingClothesResponse = {
  clotheId: string;
  name: string;
  imageUrl: string;
  priceInCents: number;
  savedCount: number;
  savedByCurrentUser: boolean;
};

export async function getRankingClothes(): Promise<
  GetClotheRankingClothesResponse[]
> {
  try {
    const response = await api.get("/customer/clothes/ranking");

    return response.data;
  } catch (error) {
    throw error;
  }
}

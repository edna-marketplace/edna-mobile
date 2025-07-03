import { StoreAddress } from "./StoreDetailsDTO";

export type ClotheDetailsImage = {
  id: string;
  url: string;
};

export type ClotheDetailsDTO = {
  id: string;
  name: string;
  height: number;
  width: number;
  priceInCents: number;
  description: string;
  size: string;
  sizeOther: string | null;
  gender: string;
  fabric: string;
  color: string;
  brand: string;
  brandOther: string | null;
  category: string;
  saved: boolean;
  storeId: string;
  storeName: string;
  storeProfileImageUrl: string;
  storeAddress: StoreAddress;
  storeAvgRating: number;
  images: ClotheDetailsImage[];
};

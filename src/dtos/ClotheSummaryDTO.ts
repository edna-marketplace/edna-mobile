export type ClotheSummaryDTO = {
  id: string;
  name: string;
  priceInCents: number;
  brand: string;
  brandOther?: string | null;
  size: string;
  sizeOther?: string | null;
  saved: boolean;
  imageURL: string;
  storeId: string;
  storeName: string;
  storeImageURL: string;
};

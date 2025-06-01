export type ClotheSummaryDTO = {
  id: string;
  name: string;
  priceInCents: number;
  brand: string;
  brandOther?: string | null;
  size: string;
  sizeOther?: string | null;
  imageURL: string;
  storeImageURL: string;
};

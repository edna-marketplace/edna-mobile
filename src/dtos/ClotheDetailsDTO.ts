export type ClotheDetailsImage = {
  id: string;
  url: string;
};

export type ClotheDetailsDTO = {
  id: string;
  name: string;
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
  storeId: string;
  storeName: string;
  storeProfileImageUrl: string;
  images: ClotheDetailsImage[];
};

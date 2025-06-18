import { StoreAddress } from "./StoreDetailsDTO";

export type OrderDTO = {
  orderId: string;
  clotheName: string;
  storeProfileImageURL: string;
  storeName: string;
  createdAt: string;
  priceInCents: number;
  rating: number | null;
  orderStatus: "PENDING" | "AWAITING_WITHDRAWAL" | "COMPLETED" | "CANCELED";
  storeAddress: StoreAddress;
};

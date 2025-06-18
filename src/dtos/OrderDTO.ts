import { StoreAddress } from "./StoreDetailsDTO";

export type OrderDTO = {
  orderId: string;
  clotheName: string;
  storeProfileImageURL: string;
  storeName: string;
  createdAt: string;
  priceInCents: number;
  orderStatus: "PENDING" | "AWAITING_WITHDRAWAL" | "COMPLETED" | "CANCELED";
  storeAddress: StoreAddress;
};

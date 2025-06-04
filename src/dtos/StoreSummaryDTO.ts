export type StoreSummaryDTO = {
  id: string;
  profileImageUrl: string | null;
  name: string;
  avgRating: number;
  targetCustomer: "MALE" | "FEMALE" | "ALL";
  distanceToCustomerInMeters: string;
  favorite: boolean;
};

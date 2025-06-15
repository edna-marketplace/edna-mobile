export type StoreAddress = {
  id: string;
  number: string;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
};

export type StoreDetailsDTO = {
  id: string;
  name: string;
  phone: string;
  avgRating: number;
  description: string | null;
  cnpj: string;
  favorite: boolean;
  distanceInKilometers: number | null;
  targetCustomer: "FEMALE" | "MALE" | "ALL";
  bannerImageUrl: string | null;
  profileImageUrl: string | null;
  address: StoreAddress;
  schedule: {
    id: string;
    dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    enabled: boolean;
    openingTimeInMinutes: number;
    closingTimeInMinutes: number;
  }[];
};

export type AuthenticatedUserDTO = {
  id: string;
  name: string;
  email: string;
  phone: string;
  stylePreference: "MALE" | "FEMALE" | "ALL";
};

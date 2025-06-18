export type AuthenticatedUserDTO = {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  stylePreference: "MALE" | "FEMALE" | "ALL";
};

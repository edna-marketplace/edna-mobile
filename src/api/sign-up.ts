import { api } from "@/lib/axios";

export type SignUpRequest = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  stylePreference?: string;
};

export async function signUp({
  stylePreference = "ALL",
  ...rest
}: SignUpRequest) {
  try {
    await api.post("/public/customers", {
      ...rest,
      stylePreference,
    });
  } catch (error) {
    throw error;
  }
}

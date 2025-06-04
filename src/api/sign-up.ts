import { api } from "@/lib/axios";

export type SignUpRequest = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
  stylePreference?: string;
};

export async function signUp(data: SignUpRequest) {
  try {
    await api.post("/public/customers", data);
  } catch (error) {
    throw error;
  }
}

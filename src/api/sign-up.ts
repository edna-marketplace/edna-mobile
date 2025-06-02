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
    console.log(data);
    await api.post("/public/customers", data);
  } catch (error) {
    throw error;
  }
}

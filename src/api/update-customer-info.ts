import { api } from "@/lib/axios";

export type UpdateCustomerRequest = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  stylePreference: string;
};

export async function updateCustomer(data: UpdateCustomerRequest) {
  try {
    await api.put("/customers", data);
  } catch (error) {
    throw error;
  }
}

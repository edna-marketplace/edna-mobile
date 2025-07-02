import { api } from "@/lib/axios";

type VerifyDuplicateCustomerBody = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  password: string;
};

export async function verifyDuplicateCustomer(
  data: VerifyDuplicateCustomerBody
) {
  try {
    const response = await api.post("/public/customers/verify-duplicate", data);

    return response.data;
  } catch (error) {
    throw error;
  }
}

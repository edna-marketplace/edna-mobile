import { api } from "@/lib/axios";

interface VerifyUserTypeResponse {
  type: "STORE" | "CUSTOMER";
}

export async function verifyUserType(
  email: string
): Promise<VerifyUserTypeResponse> {
  try {
    const response = await api.get(`/public/verify-user-type/${email}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}

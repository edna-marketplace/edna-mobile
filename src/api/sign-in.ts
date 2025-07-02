import { api } from "@/lib/axios";

export async function signIn(email: string, password: string, otp: string) {
  try {
    const response = await api.post("/auth", { email, password, otp });

    return response.data;
  } catch (error) {
    throw error;
  }
}

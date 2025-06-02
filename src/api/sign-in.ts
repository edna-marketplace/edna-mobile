import { api } from "@/lib/axios";

export async function signIn(email: string, password: string) {
  try {
    const response = await api.post("/auth", { email, password });

    return response.data;
  } catch (error) {
    throw error;
  }
}

import { api } from "@/lib/axios";

export async function sendOTPEmail(email: string, password: string) {
  try {
    await api.post("/public/two-factor-otp", { email, password });
  } catch (error) {
    throw error;
  }
}

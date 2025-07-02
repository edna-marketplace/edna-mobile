import { api } from "@/lib/axios";

export async function sendNewPasswordEmail(email: string) {
  try {
    await api.post(`/public/recover-password/${email}`);
  } catch (error) {
    throw error;
  }
}

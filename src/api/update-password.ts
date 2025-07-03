import { api } from "@/lib/axios";

interface UpdatePasswordBody {
  oldPassword: string;
  newPassword: string;
}

export async function updatePassword(data: UpdatePasswordBody) {
  try {
    await api.patch("/users/update-password", data);
  } catch (error) {
    throw error;
  }
}

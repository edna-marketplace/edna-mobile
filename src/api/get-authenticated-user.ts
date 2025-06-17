import { AuthenticatedUserDTO } from "@/dtos/AuthenticatedUserDTO";
import { api } from "@/lib/axios";

export async function getAuthenticatedUser(): Promise<AuthenticatedUserDTO> {
  try {
    const response = await api.get("/users");

    return response.data;
  } catch (error) {
    throw error;
  }
}

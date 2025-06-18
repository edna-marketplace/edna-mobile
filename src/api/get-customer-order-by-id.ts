import { OrderDTO } from "@/dtos/OrderDTO";
import { api } from "@/lib/axios";

export async function getCustomerOrderById(orderId: string): Promise<OrderDTO> {
  try {
    const response = await api.get(`/orders/customers/${orderId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
}

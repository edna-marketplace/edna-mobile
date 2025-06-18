import { OrderDTO } from "@/dtos/OrderDTO";
import { api } from "@/lib/axios";

export type FetchCustomerOrdersBody = {
  limit?: number;
  page?: number;
};

export type FetchCustomerOrdersResponse = {
  orders: OrderDTO[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
};

export async function fetchCustomerOrders(
  filters: FetchCustomerOrdersBody
): Promise<FetchCustomerOrdersResponse> {
  try {
    const response = await api.post("/orders/customers/filter", filters);

    return response.data;
  } catch (error) {
    throw error;
  }
}

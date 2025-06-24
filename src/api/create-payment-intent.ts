import { api } from "@/lib/axios";

type CreatePaymentIntentResponse = {
  clientSecret: string;
  paymentIntentId: string;
  amountInCents: number;
};

export async function createPaymentIntent(
  clotheId: string
): Promise<CreatePaymentIntentResponse> {
  try {
    const response = await api.post(
      `/orders/create-payment-intent/${clotheId}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

import { getClotheById } from "@/api/get-clothe-by-id";
import { Card } from "@/components/@ui/Card";
import { Header } from "@/components/@ui/Header";
import { Loading } from "@/components/Loading";
import { PurchaseClotheInfo } from "@/components/PurchaseClotheInfo";
import { PurchaseStoreInfo } from "@/components/PurchaseStoreInfo";
import { ClotheDetailsDTO } from "@/dtos/ClotheDetailsDTO";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { HStack, ScrollView, Text, VStack } from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import CreditCard from "phosphor-react-native/src/icons/CreditCard";
import { useCallback, useState } from "react";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Button } from "@/components/@ui/Button";
import { createOrder } from "@/api/create-order";
import { useClothes } from "@/hooks/useClothes";
import { useStripe } from "@stripe/stripe-react-native";
import { createPaymentIntent } from "@/api/create-payment-intent";

type RouteParams = {
  id: string;
};

export function Purchase() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clothe, setClothe] = useState<ClotheDetailsDTO | null>(null);

  const theme = gluestackUIConfig.tokens.colors;

  const router = useRoute();
  const { id } = router.params as RouteParams;

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigate("clothe", { id });
  }

  async function getClotheDetails() {
    const data = await getClotheById(id);

    setClothe(data);
  }

  async function handleCreateOrder() {
    try {
      const response = await createPaymentIntent(id);
      const { clientSecret, paymentIntentId, amountInCents } = response;

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Edna Marketplace",
        appearance: {
          colors: {
            background: theme.base700,
            componentBorder: theme.base500,
            componentDivider: theme.base500,
            componentText: theme.black,
          },
          primaryButton: {
            colors: {
              background: theme.base100,
              text: theme.white,
            },
          },
        },
        applePay: {
          merchantCountryCode: "BR",
        },
        googlePay: {
          merchantCountryCode: "BR",
          currencyCode: "BRL",
        },
      });

      if (error) return;

      const { error: paymentError } = await presentPaymentSheet();

      if (!paymentError) {
        await createOrder(id, paymentIntentId);
        navigate("completedPurchase");
      }
    } catch (error) {
      console.error("payment error ", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getClotheDetails();
    }, [id])
  );

  return (
    <VStack flex={1} pt="$14">
      {!clothe ? (
        <Loading />
      ) : (
        <>
          <Header title="Compra" onGoBack={handleGoBack} />

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <VStack p="$6" gap="$8">
              <PurchaseStoreInfo clothe={clothe} />

              <VStack gap="$1">
                <Text fontFamily="$title" fontSize="$lg" color="$base100">
                  Peça
                </Text>

                <PurchaseClotheInfo clothe={clothe} />
              </VStack>

              <VStack gap="$1">
                <Text fontFamily="$title" fontSize="$lg" color="$base100">
                  Método de pagamento
                </Text>

                <Card>
                  <CreditCard color={theme.base100} />

                  <Text fontFamily="$title" fontSize="$sm" color="$base100">
                    Cartão de crédito
                  </Text>
                </Card>
              </VStack>

              <VStack gap="$1">
                <Text fontFamily="$title" fontSize="$lg" color="$base100">
                  Valores
                </Text>

                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontFamily="$default" color="$base200">
                    Valor da peça
                  </Text>

                  <Text fontFamily="$default" color="$base200">
                    {clothe.priceInCents
                      ? (clothe.priceInCents / 100).toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })
                      : "R$ 0,00"}
                  </Text>
                </HStack>

                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontFamily="$title" fontSize="$xl" color="$base100">
                    Total
                  </Text>

                  <Text fontFamily="$title" fontSize="$xl" color="$base100">
                    {clothe.priceInCents
                      ? (clothe.priceInCents / 100).toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })
                      : "R$ 0,00"}
                  </Text>
                </HStack>
              </VStack>

              <Button title="Fazer pedido" onPress={handleCreateOrder} />
            </VStack>
          </ScrollView>
        </>
      )}
    </VStack>
  );
}

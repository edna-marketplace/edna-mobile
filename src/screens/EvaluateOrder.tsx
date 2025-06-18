import { getCustomerOrderById } from "@/api/get-customer-order-by-id";
import { rateOrder } from "@/api/rate-order";
import { Button } from "@/components/@ui/Button";
import { Card } from "@/components/@ui/Card";
import { Header } from "@/components/@ui/Header";
import { Loading } from "@/components/Loading";
import { OrderStatusTag } from "@/components/OrderStatusTag";
import { RatingStars } from "@/components/RatingStars";
import { StoreAvatar } from "@/components/StoreAvatar";
import { OrderDTO } from "@/dtos/OrderDTO";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { Box, HStack, Text, VStack } from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useState } from "react";

type RouteParams = {
  orderId: string;
};

export function EvaluateOrder() {
  const [order, setOrder] = useState<OrderDTO | null>(null);
  const [rating, setRating] = useState<number>(0);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  function handleGoBack() {
    navigate("orders");
  }

  async function getOrder() {
    const data = await getCustomerOrderById(orderId);

    setOrder(data);
  }

  async function handleRateOrder() {
    try {
      await rateOrder(orderId, rating);

      navigate("orders");
    } catch (error) {
      console.error(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      setRating(0);

      getOrder();
    }, [orderId])
  );

  return (
    <VStack flex={1} pt="$14">
      <Header title="Avaliação" onGoBack={handleGoBack} />

      {!order ? (
        <Loading />
      ) : (
        <VStack p="$6" gap="$6">
          <VStack justifyContent="center" gap="$3">
            <Text
              fontFamily="$specialTitle"
              fontSize="$2xl"
              textAlign="center"
              color="$base100"
            >
              Avalie seu pedido!
            </Text>
            <Text fontFamily="$default" textAlign="center" color="$base300">
              Avalie como foi sua experiência com esse brechó, sua opnião é
              muito importante!
            </Text>
          </VStack>

          <Card p="$0" mb="$4" flexDirection="column" gap="$0">
            <VStack>
              <Text mt="$3" mb="$2" textAlign="center" fontFamily="$default">
                {order.clotheName}
              </Text>

              <Box w="$full" h="$px" bg="$base500" />
            </VStack>

            <VStack px="$8" py="$6" gap="$4">
              <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center" gap="$3">
                  <StoreAvatar
                    imageURL={order.storeProfileImageURL}
                    size="sm"
                  />

                  <Text fontFamily="$title" fontSize="$sm" color="$base100">
                    {order.storeName}
                  </Text>
                </HStack>

                <Text fontFamily="$title" fontSize="$sm" color="$base300">
                  {new Date(order.createdAt).toLocaleDateString("pt-br")}
                </Text>
              </HStack>

              <HStack alignItems="center" justifyContent="space-between">
                <Text fontFamily="$title" fontSize="$xl" color="$base100">
                  {(order.priceInCents / 100).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>

                <OrderStatusTag orderStatus={order.orderStatus} />
              </HStack>
            </VStack>
          </Card>

          <RatingStars rating={rating} onRatingChange={setRating} />

          <VStack justifyContent="center" gap="$1" mt="$5">
            {rating < 1 && (
              <Text
                fontFamily="$default"
                fontSize="$sm"
                textAlign="center"
                color="$base200"
              >
                Selecione uma nota para avaliar
              </Text>
            )}
            <Button
              title="Avaliar pedido"
              isDisabled={rating < 1}
              onPress={handleRateOrder}
            />
          </VStack>
        </VStack>
      )}
    </VStack>
  );
}

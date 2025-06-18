import { fetchCustomerOrders } from "@/api/fetch-customer-orders";
import { Button } from "@/components/@ui/Button";
import { Card } from "@/components/@ui/Card";
import { Header } from "@/components/@ui/Header";
import { EmptyList } from "@/components/EmptyList";
import { OrderAddress } from "@/components/OrderAddress";
import { OrderStatusTag } from "@/components/OrderStatusTag";
import { StoreAvatar } from "@/components/StoreAvatar";
import { StoreRating } from "@/components/StoreRating";
import { OrderDTO } from "@/dtos/OrderDTO";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { Box, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Star from "phosphor-react-native/src/icons/Star";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";

export function Orders() {
  const [orders, setOrders] = useState<OrderDTO[]>([]);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigate("profile");
  }

  function handleEvaluateOrder(orderId: string) {
    navigate("evaluateOrder", { orderId });
  }

  async function fetchOrders() {
    const data = await fetchCustomerOrders({});

    setOrders(data.orders);
  }

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  return (
    <VStack flex={1} pt="$14">
      <Header title="Pedidos" onGoBack={handleGoBack} />

      <VStack px="$6" mb="$8">
        <FlatList
          data={orders}
          keyExtractor={(item) => item.orderId}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card p="$0" mb="$4" flexDirection="column" gap="$0">
              <VStack>
                <Text mt="$3" mb="$2" textAlign="center" fontFamily="$default">
                  {item.clotheName}
                </Text>

                <Box w="$full" h="$px" bg="$base500" />
              </VStack>

              <VStack px="$8" py="$6" gap="$4">
                <HStack alignItems="center" justifyContent="space-between">
                  <HStack alignItems="center" gap="$3">
                    <StoreAvatar
                      imageURL={item.storeProfileImageURL}
                      size="sm"
                    />

                    <Text fontFamily="$title" fontSize="$sm" color="$base100">
                      {item.storeName}
                    </Text>
                  </HStack>

                  <Text fontFamily="$title" fontSize="$sm" color="$base300">
                    {new Date(item.createdAt).toLocaleDateString("pt-br")}
                  </Text>
                </HStack>

                <HStack alignItems="center" justifyContent="space-between">
                  <Text fontFamily="$title" fontSize="$xl" color="$base100">
                    {(item.priceInCents / 100).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Text>

                  <HStack alignItems="center" gap="$2">
                    {item.orderStatus === "COMPLETED" &&
                      item.rating !== null && (
                        <StoreRating rating={item.rating} size="sm" />
                      )}

                    <OrderStatusTag orderStatus={item.orderStatus} />
                  </HStack>
                </HStack>

                {item.orderStatus === "AWAITING_WITHDRAWAL" && (
                  <>
                    <Box w="$full" h="$px" bg="$base500" />

                    <OrderAddress address={item.storeAddress} />
                  </>
                )}

                {item.orderStatus === "COMPLETED" && item.rating === null && (
                  <Button
                    mt="$2"
                    icon={Star}
                    iconWeight="bold"
                    title="Avaliar pedido"
                    variantStyle="secondary"
                    onPress={() => handleEvaluateOrder(item.orderId)}
                  />
                )}
              </VStack>
            </Card>
          )}
          contentContainerStyle={
            orders.length === 0
              ? {
                  height: "100%",
                  marginTop: 24,
                  paddingBottom: 32,
                }
              : {
                  marginTop: 24,
                  paddingBottom: 60,
                }
          }
          ListEmptyComponent={() => (
            <EmptyList
              title="Nenhum pedido encontrado!"
              subtitle={"Seus pedidos aparecerão aqui."}
            />
          )}
        />
      </VStack>
    </VStack>
  );
}

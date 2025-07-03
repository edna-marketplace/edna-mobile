import { fetchCustomerOrders } from "@/api/fetch-customer-orders";
import { Button } from "@/components/@ui/Button";
import { Card } from "@/components/@ui/Card";
import { Header } from "@/components/@ui/Header";
import { EmptyList } from "@/components/EmptyList";
import { Loading } from "@/components/Loading";
import { OrderAddress } from "@/components/OrderAddress";
import { OrderStatusTag } from "@/components/OrderStatusTag";
import { Pagination } from "@/components/Pagination";
import { StoreAvatar } from "@/components/StoreAvatar";
import { StoreRating } from "@/components/StoreRating";
import { OrderDTO } from "@/dtos/OrderDTO";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { Box, Center, HStack, Text, VStack } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Star from "phosphor-react-native/src/icons/Star";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";

export function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>();

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigate("profile");
  }

  function handleEvaluateOrder(orderId: string) {
    navigate("evaluateOrder", { orderId });
  }

  function handlePaginate(pageIndex: number) {
    setCurrentPage(pageIndex);
  }

  async function fetchOrders() {
    try {
      setIsLoading(true);
      const data = await fetchCustomerOrders({ page: currentPage });

      setOrders(data.orders);
      setTotalCount(data.meta.totalCount);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [currentPage])
  );

  return (
    <VStack flex={1} pt="$14">
      <Header title="Pedidos" onGoBack={handleGoBack} />

      {isLoading ? (
        <Center flex={1}>
          <Loading />
        </Center>
      ) : (
        <VStack px="$6" mb="$8">
          <FlatList
            data={orders}
            keyExtractor={(item) => item.orderId}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Card p="$0" mb="$4" flexDirection="column" gap="$0">
                <VStack>
                  <Text
                    mt="$3"
                    mb="$2"
                    textAlign="center"
                    fontFamily="$default"
                  >
                    {item.clotheName}
                  </Text>

                  <Box w="$full" h="$px" bg="$base500" />
                </VStack>

                <VStack p="$6" gap="$4">
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
            ListFooterComponent={() =>
              orders.length > 0 && (
                <Pagination
                  onPageChange={handlePaginate}
                  pageIndex={currentPage}
                  perPage={10}
                  totalCount={totalCount ? totalCount : 0}
                />
              )
            }
          />
        </VStack>
      )}
    </VStack>
  );
}

import { toggleFavoriteStore } from "@/api/toggle-favorite-store";
import { useStores } from "@/hooks/useStores";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { Text, VStack } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { StoreSummary } from "./StoreSummary";
import { EmptyList } from "./EmptyList";
import { Button } from "./@ui/Button";
import Storefront from "phosphor-react-native/src/icons/Storefront";
import { StoreSummaryDTO } from "@/dtos/StoreSummaryDTO";

export function StoreHomeSummary() {
  const [stores, setStores] = useState<StoreSummaryDTO[]>([]);
  const { fetchStores } = useStores();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleStoreDetails(id: string) {
    navigation.navigate("store", { id });
  }

  async function handleToggleFavoriteStore(id: string) {
    await toggleFavoriteStore(id);
  }

  async function handleFetchStores() {
    const data = await fetchStores(1);

    setStores(data.stores);
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchStores();
    }, [])
  );

  return (
    <>
      <Text
        fontFamily="$title"
        fontSize="$lg"
        color="$base200"
        ml="$6"
        mb="-$3"
      >
        Brechós
      </Text>

      <VStack flex={1} bg="$base700" px="$6">
        <FlatList
          data={stores}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StoreSummary
              onPress={() => handleStoreDetails(item.id)}
              store={item}
              isStoreFavorite={item.favorite}
              onFavorite={handleToggleFavoriteStore}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            stores.length === 0
              ? {
                  height: "100%",
                  paddingBottom: 32,
                }
              : {
                  paddingBottom: 32,
                }
          }
          ListFooterComponent={() => (
            <Button
              title="Mais brechós"
              variantStyle="secondary"
              icon={Storefront}
              onPress={() => navigation.navigate("stores")}
            />
          )}
          ListEmptyComponent={() => (
            <EmptyList
              title="Nenhum brechó encontrado!"
              subtitle={"Nenhum brechó foi encontrado."}
            />
          )}
        />
      </VStack>
    </>
  );
}

import { Box, VStack } from "@gluestack-ui/themed";

import { toggleFavoriteStore } from "@/api/toggle-favorite-store";
import { Input } from "@/components/@ui/Input";
import { EmptyList } from "@/components/EmptyList";
import { StoreFiltersFlatList } from "@/components/StoreFiltersFlatList";
import { StoreSummary } from "@/components/StoreSummary";
import { SwitchCategoryStore } from "@/components/SwitchCategoryStore";
import { storeFilters } from "@/data/store-filters";
import { useStores } from "@/hooks/useStores";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MagnifyingGlass from "phosphor-react-native/src/icons/MagnifyingGlass";
import { useCallback } from "react";
import { FlatList } from "react-native";

type RouteParamsProps = {
  category: string;
};

export function Stores() {
  const { stores, fetchStores, setFilterValue, clearFilters } = useStores();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleStoreDetails(id: string) {
    navigation.navigate("store", { id });
  }

  const handleSearchByName = useCallback(
    debounce((query: string) => {
      setFilterValue("NAME", query);
    }, 300),
    []
  );

  function debounce(func: Function, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }

  async function handleToggleFavoriteStore(id: string) {
    await toggleFavoriteStore(id);
  }

  useFocusEffect(
    useCallback(() => {
      clearFilters();

      fetchStores();
    }, [])
  );

  return (
    <>
      <VStack pt="$14">
        <Box px="$6">
          <Input
            icon={MagnifyingGlass}
            placeholder='Buscas em "Brechós"'
            onChangeText={(value) => handleSearchByName(value)}
          />
        </Box>

        <Box w="$full" h="$px" bg="$base500" mt="$6" />
      </VStack>

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
          ListHeaderComponent={() => (
            <VStack flex={1} mb="$6" alignItems="flex-start">
              <SwitchCategoryStore />

              <StoreFiltersFlatList filters={storeFilters} />
            </VStack>
          )}
          ListHeaderComponentStyle={{
            width: "100%",
            justifyContent: "flex-start",
          }}
          ListEmptyComponent={() => (
            <EmptyList
              title="Nenhum brechó encontrado!"
              subtitle={"Nenhum brechó foi encontrado com os filtros atuais."}
              callToActionButtonTitle="Limpar filtros"
              onCallToAction={clearFilters}
            />
          )}
        />
      </VStack>
    </>
  );
}

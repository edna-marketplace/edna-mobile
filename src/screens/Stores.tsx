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
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { StoreSummaryDTO } from "@/dtos/StoreSummaryDTO";
import { Loading } from "@/components/Loading";
import { Pagination } from "@/components/Pagination";

export function Stores() {
  const [stores, setStores] = useState<StoreSummaryDTO[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>();

  const { fetchStores, isLoading, filtersChanged, setFilterValue } =
    useStores();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleStoreDetails(id: string) {
    navigation.navigate("store", { id });
  }

  function handlePaginate(pageIndex: number) {
    setCurrentPage(pageIndex);
  }

  const handleSearchByName = useCallback(
    debounce((query: string) => {
      setFilterValue("NAME", query);
    }, 300),
    [setFilterValue]
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

  async function handleFetchStores() {
    const data = await fetchStores(currentPage);

    setStores(data.stores);
    setTotalCount(data.meta.totalCount);
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchStores();
    }, [filtersChanged, currentPage])
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
        {isLoading ? (
          <Loading />
        ) : (
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
              <VStack mb="$6" alignItems="flex-start">
                <SwitchCategoryStore />

                <StoreFiltersFlatList filters={storeFilters} />
              </VStack>
            )}
            ListHeaderComponentStyle={{
              width: "100%",
              justifyContent: "flex-start",
            }}
            ListFooterComponent={() => (
              <Pagination
                onPageChange={handlePaginate}
                pageIndex={currentPage}
                perPage={10}
                totalCount={totalCount ? totalCount : 1}
              />
            )}
            ListEmptyComponent={() => (
              <EmptyList
                title="Nenhum brechó encontrado!"
                subtitle={"Nenhum brechó foi encontrado com os filtros atuais."}
              />
            )}
          />
        )}
      </VStack>
    </>
  );
}

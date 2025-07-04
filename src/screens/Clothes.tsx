import { Box, HStack, Pressable, VStack } from "@gluestack-ui/themed";

import { Header } from "@/components/@ui/Header";
import { ClotheFiltersFlatList } from "@/components/ClotheFiltersFlatList";
import { ClotheSummary } from "@/components/ClotheSummary";
import { EmptyList } from "@/components/EmptyList";
import { categories } from "@/data/categories";
import { clotheFilters } from "@/data/clothe-filters";
import { useClothes } from "@/hooks/useClothes";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import { Loading } from "@/components/Loading";
import { Pagination } from "@/components/Pagination";
import CaretLeft from "phosphor-react-native/src/icons/CaretLeft";
import { Input } from "@/components/@ui/Input";
import MagnifyingGlass from "phosphor-react-native/src/icons/MagnifyingGlass";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

type RouteParamsProps = {
  category?: string;
  storeId?: string;
  storeName?: string;
};

export function Clothes() {
  const [clothes, setClothes] = useState<ClotheSummaryDTO[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>();

  const theme = gluestackUIConfig.tokens.colors;

  const { fetchClothes, isLoading, filtersChanged, setFilterValue } =
    useClothes();

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const { category, storeId, storeName } = route.params as RouteParamsProps;

  function handleGoBack() {
    category && navigate("categories");

    storeId && navigate("store", { id: storeId });
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

  async function handleFetchClothes() {
    if (storeId) {
      setFilterValue("CATEGORY", "ALL");
      setFilterValue("STORE_ID", storeId);
    } else {
      setFilterValue("STORE_ID", undefined);
    }

    const data = await fetchClothes(currentPage, category);

    setClothes(data.clothes);
    setTotalCount(data.meta.totalCount);
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchClothes();
    }, [category, storeId, currentPage])
  );

  useEffect(() => {
    if (filtersChanged) {
      handleFetchClothes();
    }
  }, [filtersChanged]);

  let headerDisplayName: string | undefined = "";

  if (category) {
    headerDisplayName = categories.find(
      (c) => c.category === category
    )?.displayName;
  }

  if (storeName) {
    headerDisplayName = storeName;
  }

  return (
    <>
      <VStack pt="$14">
        <HStack alignItems="center" gap="$4" px="$6" w="89%">
          <Pressable onPress={handleGoBack}>
            <CaretLeft color={theme.base200} />
          </Pressable>
          <Input
            icon={MagnifyingGlass}
            placeholder={`Buscar em "${headerDisplayName}"`}
            onChangeText={(value) => handleSearchByName(value)}
          />
        </HStack>

        <Box w="$full" h="$px" bg="$base500" mt="$6" />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={clothes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ClotheSummary clothe={item} />}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <HStack my="$6" mx={-24}>
              <ClotheFiltersFlatList filters={clotheFilters} />
            </HStack>
          )}
          contentContainerStyle={
            clothes.length === 0
              ? {
                  height: "100%",
                  paddingHorizontal: 24,
                  paddingBottom: 32,
                }
              : {
                  paddingBottom: 32,
                  paddingHorizontal: 24,
                }
          }
          ListEmptyComponent={() => (
            <EmptyList
              title="Nenhuma peça encontrada!"
              subtitle={"Nenhuma peça foi encontrada com os filtros atuais."}
            />
          )}
          ListFooterComponent={() =>
            clothes.length > 0 && (
              <Pagination
                onPageChange={handlePaginate}
                pageIndex={currentPage}
                perPage={10}
                totalCount={totalCount ? totalCount : 0}
              />
            )
          }
        />
      )}
    </>
  );
}

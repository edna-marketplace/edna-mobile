import { HStack, VStack } from "@gluestack-ui/themed";

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

type RouteParamsProps = {
  category?: string;
  storeId?: string;
  storeName?: string;
};

export function Clothes() {
  const [clothes, setClothes] = useState<ClotheSummaryDTO[]>([]);
  const { fetchClothes, isLoading, filtersChanged, setFilterValue } =
    useClothes();

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const { category, storeId, storeName } = route.params as RouteParamsProps;

  function handleGoBack() {
    category && navigate("categories");

    storeId && navigate("store", { id: storeId });
  }

  async function handleFetchClothes() {
    if (storeId) {
      setFilterValue("CATEGORY", "ALL");
      setFilterValue("STORE_ID", storeId);
    } else {
      setFilterValue("STORE_ID", undefined);
    }

    const data = await fetchClothes(category);

    setClothes(data);
  }

  useFocusEffect(
    useCallback(() => {
      handleFetchClothes();
    }, [category, storeId])
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
    <VStack flex={1} bg="$base700" pt="$14">
      <Header
        title={headerDisplayName ? headerDisplayName : "Peças"}
        onGoBack={handleGoBack}
      />

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
        />
      )}
    </VStack>
  );
}

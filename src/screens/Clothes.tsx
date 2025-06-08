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
import { useCallback } from "react";
import { FlatList } from "react-native";

type RouteParamsProps = {
  category: string;
};

export function Clothes() {
  const { clothes, setFilterValue, clearFilters } = useClothes();

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const { category } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigate("categories");
  }

  function setCategoryFilter() {
    setFilterValue("CATEGORY", category);
  }

  useFocusEffect(
    useCallback(() => {
      clearFilters();

      setCategoryFilter();
    }, [category])
  );

  const categoryDisplayName = categories.find(
    (c) => c.category === category
  )?.displayName;

  return (
    <VStack flex={1} bg="$base700" pt="$14">
      <Header
        title={categoryDisplayName ? categoryDisplayName : "Peças"}
        onGoBack={handleGoBack}
      />
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
            callToActionButtonTitle="Explorar outras categorias"
            onCallToAction={handleGoBack}
          />
        )}
      />
    </VStack>
  );
}

import { HStack, VStack } from "@gluestack-ui/themed";

import { Header } from "@/components/@ui/Header";
import { ClotheSummary } from "@/components/ClotheSummary";
import { FiltersFlatList } from "@/components/FiltersFlatList";
import { filters } from "@/data/clothe-filters";
import { FlatList } from "react-native";
import { useClothes } from "@/hooks/useClothes";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { useCallback } from "react";
import { categories } from "@/data/categories";

type RouteParamsProps = {
  category: string;
};

export function Clothes() {
  const { clothes, clearFilters } = useClothes();

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const { category } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigate("categories");
  }

  useFocusEffect(
    useCallback(() => {
      clearFilters();
    }, [])
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
            <FiltersFlatList filters={filters} />
          </HStack>
        )}
        contentContainerStyle={{
          paddingBottom: 32,
          paddingHorizontal: 24,
        }}
      />
    </VStack>
  );
}

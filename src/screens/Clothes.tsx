import { HStack, VStack } from "@gluestack-ui/themed";

import { Header } from "@/components/@ui/Header";
import { ClotheSummary } from "@/components/ClotheSummary";
import { FiltersFlatList } from "@/components/FiltersFlatList";
import { filters } from "@/data/clothe-filters";
import { FlatList } from "react-native";
import { useClothes } from "@/hooks/useClothes";

export function Clothes() {
  const { clothes } = useClothes();

  return (
    <VStack flex={1} bg="$base700" py="$14">
      <Header title="Camisetas" onGoBack={() => {}} />

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

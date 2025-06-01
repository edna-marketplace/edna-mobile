import { Text, VStack } from "@gluestack-ui/themed";

import { Input } from "@/components/@ui/Input";

import MagnifyingGlass from "phosphor-react-native/src/icons/MagnifyingGlass";

import { CategoryCard } from "@/components/CategoryCard";
import { FlatList } from "react-native";
import { categories } from "@/data/categories";

export function ClotheCategories() {
  return (
    <VStack flex={1} bg="$base700" px="$6" py="$14" gap="$6">
      <Input icon={MagnifyingGlass} placeholder='Buscas em "Todas"' />

      <Text fontFamily="$specialTitle" fontSize="$2xl">
        Categorias
      </Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => <CategoryCard category={item} />}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 32,
        }}
      />
    </VStack>
  );
}

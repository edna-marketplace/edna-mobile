import { Box, Text, VStack } from "@gluestack-ui/themed";

import { Input } from "@/components/@ui/Input";

import MagnifyingGlass from "phosphor-react-native/src/icons/MagnifyingGlass";

import { CategoryCard } from "@/components/CategoryCard";
import { FlatList } from "react-native";
import { categories } from "@/data/categories";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";

export function ClotheCategories() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleSelectCategory(category: string) {
    navigate("clothes", { category });
  }

  return (
    <>
      <VStack pt="$14">
        <Box px="$6">
          <Input icon={MagnifyingGlass} placeholder='Buscas em "Todas"' />
        </Box>

        <Box w="$full" h="$px" bg="$base500" mt="$6" />
      </VStack>

      <VStack flex={1} bg="$base700" px="$6">
        <FlatList
          data={categories}
          keyExtractor={(item) => item.category}
          renderItem={({ item }) => (
            <CategoryCard
              category={item}
              onPress={() => handleSelectCategory(item.category)}
            />
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 32,
          }}
          ListHeaderComponent={() => (
            <Text
              fontFamily="$specialTitle"
              fontSize="$2xl"
              pb="$6"
              pt="$5"
              alignSelf="auto"
            >
              Categorias
            </Text>
          )}
          ListHeaderComponentStyle={{
            width: "100%",
            alignItems: "flex-start",
          }}
        />
      </VStack>
    </>
  );
}

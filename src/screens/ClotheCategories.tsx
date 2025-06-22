import { Box, Image, VStack } from "@gluestack-ui/themed";

import { CategoryCard } from "@/components/CategoryCard";
import { SwitchCategoryStore } from "@/components/SwitchCategoryStore";
import { categories } from "@/data/categories";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";

import logoImg from "@/assets/logo/logo.png";

export function ClotheCategories() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleSelectCategory(category: string) {
    navigate("clothes", { category });
  }

  return (
    <>
      <VStack pt="$14">
        <Box px="$6">
          <Image source={logoImg} alt="" w="$20" h="$10" alignSelf="center" />
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
          ListHeaderComponent={() => <SwitchCategoryStore />}
          ListHeaderComponentStyle={{
            width: "100%",
            alignItems: "flex-start",
          }}
        />
      </VStack>
    </>
  );
}

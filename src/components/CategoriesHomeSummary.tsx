import { Box, Center, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { FlatList } from "react-native";
import { CategoryCard } from "./CategoryCard";
import { categories } from "@/data/categories";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";

import ArrowRight from "phosphor-react-native/src/icons/ArrowRight";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { useState } from "react";

export function CategoriesHomeSummary() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const theme = gluestackUIConfig.tokens.colors;

  function handleCategories() {
    navigate("categories");
  }

  function handleSelectCategory(category: string) {
    navigate("clothes", { category });
  }

  return (
    <VStack>
      <Pressable onPress={handleCategories}>
        <Text
          fontFamily="$title"
          fontSize="$lg"
          color="$base200"
          pb="$2"
          ml="$6"
        >
          Categorias
        </Text>
      </Pressable>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            size="sm"
            mr="$3"
            onPress={() => handleSelectCategory(item.category)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ListFooterComponent={() => (
          <Pressable flex={1} onPress={handleCategories}>
            <Center flex={1} ml="$4" mr="$2">
              <Box
                w={50}
                h={50}
                rounded="$full"
                bg="$base100"
                justifyContent="center"
                alignItems="center"
              >
                <ArrowRight color={theme.white} weight="bold" />
              </Box>
            </Center>
          </Pressable>
        )}
      />
    </VStack>
  );
}

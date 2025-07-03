import { categories } from "@/data/categories";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { Box, Center, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { CategoryCard } from "./CategoryCard";

import ArrowRight from "phosphor-react-native/src/icons/ArrowRight";
import { useCallback, useRef } from "react";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

export function CategoriesHomeSummary() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const flatListRef = useRef<FlatList>(null);

  const theme = gluestackUIConfig.tokens.colors;

  function handleCategories() {
    navigate("categories");
  }

  function handleSelectCategory(category: string) {
    navigate("clothes", { category });
  }

  useFocusEffect(
    useCallback(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    }, [])
  );

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
        ref={flatListRef}
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

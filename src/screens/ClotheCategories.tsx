import { Box, Image, VStack } from "@gluestack-ui/themed";

import { CategoryCard } from "@/components/CategoryCard";
import { SwitchCategoryStore } from "@/components/SwitchCategoryStore";
import { categories } from "@/data/categories";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";

import logoImg from "@/assets/logo/logo.png";
import { useCallback, useRef } from "react";

export function ClotheCategories() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const flatListRef = useRef<FlatList>(null);

  function handleSelectCategory(category: string) {
    if (category === "OTHER") {
      navigate("categoryOther");
      return;
    }

    navigate("clothes", { category });
  }

  useFocusEffect(
    useCallback(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    }, [])
  );

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
          ref={flatListRef}
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

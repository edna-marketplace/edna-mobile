import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Button } from "./@ui/Button";

export function SwitchCategoryStore() {
  const route = useRoute();
  const pathname = route.name;

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleCategories() {
    navigate("categories");
  }

  function handleStores() {
    navigate("stores");
  }

  return (
    <HStack
      w="$full"
      pb="$6"
      pt="$5"
      px="$2"
      gap="$16"
      justifyContent="space-between"
      alignItems="center"
    >
      <VStack>
        <Pressable onPress={handleCategories}>
          <Text
            fontFamily="$specialTitle"
            fontSize={pathname === "categories" ? "$2xl" : "$xl"}
            color={pathname === "categories" ? "$base100" : "$base400"}
          >
            Categorias
          </Text>
        </Pressable>
      </VStack>
      <Pressable onPress={handleStores}>
        <Text
          fontFamily="$specialTitle"
          fontSize={pathname === "stores" ? "$2xl" : "$xl"}
          color={pathname === "stores" ? "$base100" : "$base300"}
        >
          Brechós
        </Text>
      </Pressable>
    </HStack>
  );
}

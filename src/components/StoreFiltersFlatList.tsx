import { Pressable, Text } from "@gluestack-ui/themed";
import { FlatList } from "react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { StoreFilterDrawer } from "./StoreFilterDrawer";
import { useStores } from "@/hooks/useStores";
import { useState } from "react";

type Props = {
  filters: ArrayLike<any> | null | undefined;
};

export function StoreFiltersFlatList({ filters }: Props) {
  const { setFilterValue, getFilterValue } = useStores();

  const isFavorite = getFilterValue("IS_FAVORITE") as boolean;

  function toggleIsFavorite() {
    setFilterValue("IS_FAVORITE", !isFavorite);
  }

  return (
    <FlatList
      data={filters}
      keyExtractor={(item) => item.filter}
      renderItem={({ item }) => (
        <>
          {item.type === "drawer" ? (
            <StoreFilterDrawer
              displayName={item.displayName}
              filterType={item.filter}
              filters={item.options}
            />
          ) : (
            <Pressable
              alignItems="center"
              mr="$2"
              ml="-$5"
              px="$3"
              py="$2"
              bg={!isFavorite ? "$base600" : "$base100"}
              borderWidth={1}
              borderColor={!isFavorite ? "$base500" : "transparent"}
              rounded="$lg"
              onPress={toggleIsFavorite}
            >
              <Text
                size="sm"
                color={!isFavorite ? "$base200" : "$base700"}
                fontFamily="$default"
              >
                {item.displayName}
              </Text>
            </Pressable>
          )}
        </>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 24 }}
    />
  );
}

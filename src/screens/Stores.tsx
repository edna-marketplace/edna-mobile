import { Box, VStack } from "@gluestack-ui/themed";

import { Input } from "@/components/@ui/Input";
import { StoreSummary } from "@/components/StoreSummary";
import { SwitchCategoryStore } from "@/components/SwitchCategoryStore";
import { StoreSummaryDTO } from "@/dtos/StoreSummaryDTO";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import MagnifyingGlass from "phosphor-react-native/src/icons/MagnifyingGlass";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { StoreFiltersFlatList } from "@/components/StoreFiltersFlatList";
import { filters } from "@/data/store-filters";
import { useStores } from "@/hooks/useStores";
import { toggleFavoriteStore } from "@/api/toggle-favorite-store";

type RouteParamsProps = {
  category: string;
};

export function Stores() {
  const { stores, clearFilters } = useStores();

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function setCategoryFilter() {}

  async function handleToggleFavoriteStore(id: string) {
    await toggleFavoriteStore(id);
  }

  useFocusEffect(
    useCallback(() => {
      clearFilters();
    }, [])
  );

  return (
    <>
      <VStack pt="$14">
        <Box px="$6">
          <Input icon={MagnifyingGlass} placeholder='Buscas em "Brechós"' />
        </Box>

        <Box w="$full" h="$px" bg="$base500" mt="$6" />
      </VStack>

      <VStack flex={1} bg="$base700" px="$6">
        <FlatList
          data={stores}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StoreSummary store={item} onFavorite={handleToggleFavoriteStore} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 32,
          }}
          ListHeaderComponent={() => (
            <VStack flex={1} mb="$6" alignItems="flex-start">
              <SwitchCategoryStore />

              <StoreFiltersFlatList filters={filters} />
            </VStack>
          )}
          ListHeaderComponentStyle={{
            width: "100%",
            justifyContent: "flex-start",
          }}
        />
      </VStack>
    </>
  );
}

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

type RouteParamsProps = {
  category: string;
};

export function Stores() {
  const [stores, setStores] = useState<StoreSummaryDTO[]>([
    {
      id: "1",
      profileImageUrl: "a",
      name: "Brechó Esportes",
      avgRating: 0.0,
      targetCustomer: "ALL",
      distanceToCustomerInMeters: "100.7 km",
      favorite: true,
    },
    {
      id: "2",
      profileImageUrl: "a",
      name: "Brechó Esportes",
      avgRating: 4.9,
      targetCustomer: "ALL",
      distanceToCustomerInMeters: "10.7 km",
      favorite: false,
    },
    {
      id: "3",
      profileImageUrl: null,
      name: "Brechó Esportes",
      avgRating: 4.9,
      targetCustomer: "ALL",
      distanceToCustomerInMeters: "1000.6 km",
      favorite: false,
    },
  ]);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function setCategoryFilter() {}

  async function toggleFavoriteStore(id: string) {
    return;
  }

  useFocusEffect(
    useCallback(() => {
      setCategoryFilter();
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
            <StoreSummary store={item} onFavorite={toggleFavoriteStore} />
          )}
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

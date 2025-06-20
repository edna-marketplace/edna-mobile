import { fetchStoresWithFilter } from "@/api/fetch-stores-with-filter";
import { toggleFavoriteStore } from "@/api/toggle-favorite-store";
import { Header } from "@/components/@ui/Header";
import { EmptyList } from "@/components/EmptyList";
import { Loading } from "@/components/Loading";
import { StoreSummary } from "@/components/StoreSummary";
import { StoreSummaryDTO } from "@/dtos/StoreSummaryDTO";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { VStack } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";

export function FavoriteStores() {
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteStores, setFavoriteStores] = useState<StoreSummaryDTO[]>([]);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigate("profile");
  }

  function handleStoreDetails(id: string) {
    navigate("store", { id });
  }

  async function fetchFavoriteStores() {
    setIsLoading(true);
    const data = await fetchStoresWithFilter({ isFavorite: true });

    setFavoriteStores(data.stores);
    setIsLoading(false);
  }

  async function removeFavoriteStore(id: string) {
    setFavoriteStores((prevStores) =>
      prevStores.filter((store) => store.id !== id)
    );

    await toggleFavoriteStore(id);
  }

  useFocusEffect(
    useCallback(() => {
      fetchFavoriteStores();
    }, [])
  );

  return (
    <VStack flex={1} mt="$14">
      <Header title="Brechós favoritos" onGoBack={handleGoBack} />

      <VStack flex={1} px="$6">
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={favoriteStores}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <StoreSummary
                onPress={() => handleStoreDetails(item.id)}
                store={item}
                isStoreFavorite={item.favorite}
                onFavorite={() => removeFavoriteStore(item.id)}
              />
            )}
            contentContainerStyle={
              favoriteStores.length === 0
                ? {
                    height: "100%",
                    marginTop: 24,
                    paddingBottom: 32,
                  }
                : {
                    marginTop: 24,
                    paddingBottom: 60,
                  }
            }
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <EmptyList
                title="Nenhum brechó favorito!"
                subtitle="Seus brechós favoritos aparecerão aqui."
              />
            )}
          />
        )}
      </VStack>
    </VStack>
  );
}

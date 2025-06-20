import { fetchClothesWithFilter } from "@/api/fetch-clothes-with-filter";
import { toggleSaveClothe } from "@/api/toggle-save-clothe";
import { Header } from "@/components/@ui/Header";
import { EmptyList } from "@/components/EmptyList";
import { Loading } from "@/components/Loading";
import { SavedClothe } from "@/components/SavedClothe";
import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { VStack } from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";

export function SavedClothes() {
  const [isLoading, setIsLoading] = useState(false);
  const [savedClothes, setSavedClothes] = useState<ClotheSummaryDTO[]>([]);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleClotheDetails(id: string) {
    navigate("clothe", { id });
  }

  async function fetchSavedClothes() {
    setIsLoading(true);
    const data = await fetchClothesWithFilter({ isSaved: true });

    setSavedClothes(data.clothes);
    setIsLoading(false);
  }

  async function removeSavedClothe(id: string) {
    setSavedClothes((prevClothes) =>
      prevClothes.filter((clothe) => clothe.id !== id)
    );

    await toggleSaveClothe(id);
  }

  function handleGoBack() {
    navigate("profile");
  }

  useFocusEffect(
    useCallback(() => {
      fetchSavedClothes();
    }, [])
  );

  return (
    <VStack flex={1} pt="$14">
      <Header title="Peças salvas" onGoBack={handleGoBack} />

      <VStack flex={1} px="$6">
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={savedClothes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SavedClothe
                clothe={item}
                onPress={() => handleClotheDetails(item.id)}
                onRemoveSavedStatus={removeSavedClothe}
              />
            )}
            contentContainerStyle={
              savedClothes.length === 0
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
                title="Nenhuma peça salva!"
                subtitle="Suas peças salvas aparecerão aqui."
              />
            )}
          />
        )}
      </VStack>
    </VStack>
  );
}

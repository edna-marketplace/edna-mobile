import { Header } from "@/components/@ui/Header";
import {
  Box,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import { Button } from "@/components/@ui/Button";
import { ClotheBrandSize } from "@/components/ClotheBrandSize";
import { StoreAvatar } from "@/components/StoreAvatar";

import { getClotheById } from "@/api/get-clothe-by-id";
import { ClotheImagesCarousel } from "@/components/ClotheImagesCarousel";
import { Loading } from "@/components/Loading";
import { ClotheDetailsDTO } from "@/dtos/ClotheDetailsDTO";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { clotheGenderMapper } from "@/utils/clotheGenderMapper";
import { getBrandDisplayName } from "@/utils/getBrandDisplayName";
import { getSizeDisplayName } from "@/utils/getSizeDisplayName";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import BookmarkSimple from "phosphor-react-native/src/icons/BookmarkSimple";
import Check from "phosphor-react-native/src/icons/Check";
import { useCallback, useRef, useState } from "react";
import { toggleSaveClothe } from "@/api/toggle-save-clothe";

type RouteParams = {
  id: string;
};

export function ClotheDetails() {
  const [clothe, setClothe] = useState<ClotheDetailsDTO | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const scrollViewRef = useRef<any>(null);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const { id } = route.params as RouteParams;

  function handleGoBack() {
    clothe && navigate("store", { id: clothe.storeId });
  }

  function handleNavigateStore() {
    clothe && navigate("store", { id: clothe.storeId });
  }

  function handlePurchase() {
    navigate("purchase", { id });
  }

  async function handleToggleSaveClothe() {
    await toggleSaveClothe(id);

    setIsSaved(!isSaved);
  }

  async function getClotheDetails() {
    const data = await getClotheById(id);

    setClothe(data);
    setIsSaved(data.saved);
  }

  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });

      getClotheDetails();
    }, [id])
  );

  return (
    <VStack flex={1} pt="$14">
      {!clothe ? (
        <Loading />
      ) : (
        <>
          <Header title={clothe.name} onGoBack={handleGoBack} />

          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <ClotheImagesCarousel entries={clothe.images} />

            <VStack flex={1} px="$6" pt="$2" pb="$8">
              <Text fontFamily="$title" fontSize="$2xl" color="$base200">
                {clothe.name}
              </Text>

              <VStack mb="$5">
                <Text fontFamily="$title" fontSize="$3xl" color="$base100">
                  {(clothe.priceInCents / 100).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Text>
                <Text
                  fontFamily="$default"
                  fontSize="$md"
                  color="$base300"
                  mt="-$2"
                >
                  Em até 12x{" "}
                  {(clothe.priceInCents / 100 / 12).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}{" "}
                  sem juros
                </Text>
              </VStack>

              <HStack alignItems="center" justifyContent="space-between">
                <Pressable
                  flexDirection="row"
                  gap="$3"
                  alignItems="center"
                  onPress={handleNavigateStore}
                >
                  <StoreAvatar imageURL={clothe.storeProfileImageUrl} />

                  <Text
                    fontFamily="$title"
                    color="$base200"
                    flexShrink={1}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    minWidth={1}
                    maxWidth="$36"
                  >
                    {clothe.storeName}
                  </Text>
                </Pressable>

                <ClotheBrandSize clothe={clothe} />
              </HStack>

              <Button title="Comprar agora" mt="$5" onPress={handlePurchase} />

              <Button
                title={isSaved ? "Peça salva" : "Salvar peça"}
                variantStyle={"secondary"}
                icon={isSaved ? Check : BookmarkSimple}
                mt="$4"
                onPress={handleToggleSaveClothe}
              />

              <Box w="$full" h="$px" bg="$base500" my="$6" />

              <VStack gap="$5">
                <VStack gap="$1">
                  <Text fontFamily="$title" fontSize="$2xl" color="$base100">
                    Detalhes de peça
                  </Text>

                  {clothe.description ? (
                    <Text fontFamily="$default" fontSize="$lg" color="$base100">
                      {clothe.description}
                    </Text>
                  ) : (
                    <Text
                      fontFamily="$default"
                      color="$base100"
                      fontSize="$lg"
                      my="$4"
                    >
                      Sem descrição.
                    </Text>
                  )}
                </VStack>

                <HStack alignItems="center" justifyContent="space-between">
                  <VStack gap="$1">
                    <Text fontFamily="$title" fontSize="$xl" color="$base300">
                      Tamanho
                    </Text>

                    <Text fontFamily="$default" fontSize="$lg" color="$base100">
                      {getSizeDisplayName(clothe)}
                    </Text>
                  </VStack>

                  <VStack gap="$1" mr="$20">
                    <Text
                      fontFamily="$title"
                      textAlign="right"
                      fontSize="$xl"
                      color="$base300"
                    >
                      Gênero
                    </Text>

                    <Text
                      fontFamily="$default"
                      textAlign="right"
                      fontSize="$lg"
                      color="$base100"
                    >
                      {clotheGenderMapper[clothe.gender]}
                    </Text>
                  </VStack>
                </HStack>

                <HStack alignItems="center" justifyContent="space-between">
                  <VStack gap="$1">
                    <Text fontFamily="$title" fontSize="$xl" color="$base300">
                      Tecido
                    </Text>

                    <Text
                      numberOfLines={1}
                      fontFamily="$default"
                      fontSize="$lg"
                      color="$base100"
                    >
                      {clothe.fabric}
                    </Text>
                  </VStack>

                  <VStack gap="$1" mr="$20">
                    <Text
                      fontFamily="$title"
                      fontSize="$xl"
                      color="$base300"
                      textAlign="right"
                    >
                      Cor
                    </Text>

                    <Text
                      fontFamily="$default"
                      fontSize="$lg"
                      color="$base100"
                      textAlign="right"
                    >
                      {clothe.color}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>

              <Box w="$full" h="$px" bg="$base500" my="$6" />

              <VStack>
                <Text fontFamily="$title" fontSize="$2xl" color="$base100">
                  Marca
                </Text>

                <Text fontFamily="$title" fontSize="$lg" color="$base300">
                  {getBrandDisplayName(clothe)}
                </Text>
              </VStack>
            </VStack>
          </ScrollView>
        </>
      )}
    </VStack>
  );
}

import { Header } from "@/components/@ui/Header";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import {
  Box,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import Heart from "phosphor-react-native/src/icons/Heart";
import MapPin from "phosphor-react-native/src/icons/MapPin";
import Storefront from "phosphor-react-native/src/icons/Storefront";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { fetchClothesWithFilter } from "@/api/fetch-clothes-with-filter";
import { getStoreById } from "@/api/get-store-by-id";
import { toggleFavoriteStore } from "@/api/toggle-favorite-store";
import { Button } from "@/components/@ui/Button";
import { Loading } from "@/components/Loading";
import { StoreInfo } from "@/components/StoreInfo";
import { StoreRating } from "@/components/StoreRating";
import { StoreShowcase } from "@/components/StoreShowcase";
import { SwitchShowcaseDetails } from "@/components/SwitchShowcaseDetails";
import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import { StoreDetailsDTO } from "@/dtos/StoreDetailsDTO";
import { shortenAddress } from "@/utils/addressFormatter";
import { toTargetCustomerDisplay } from "@/utils/toTargetCustomerDisplay";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import logoImg from "@/assets/logo/logo.png";

type RouteParams = {
  id: string;
};

export function StoreDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [store, setStore] = useState<StoreDetailsDTO | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [display, setDisplay] = useState<"showcase" | "details">("showcase");
  const [showcaseClothes, setShowcaseClothes] = useState<ClotheSummaryDTO[]>(
    []
  );

  const theme = gluestackUIConfig.tokens.colors;

  const route = useRoute();
  const { id } = route.params as RouteParams;

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  async function getStoreDetails() {
    const data = await getStoreById(id);

    setStore(data);
    setIsFavorite(data.favorite);
  }

  async function fetchStoreClothes() {
    const { clothes } = await fetchClothesWithFilter({ storeId: id });

    setShowcaseClothes(clothes);
  }

  async function handleToggleFavoriteStore() {
    setIsFavorite(!isFavorite);

    await toggleFavoriteStore(id);
    await fetchStoreClothes();
  }

  function handleGoBack() {
    navigate("stores");
  }

  function handleViewMoreClothes() {
    store && navigate("clothes", { storeId: id, storeName: store.name });
  }

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      setDisplay("showcase");
      setShowcaseClothes([]);

      getStoreDetails();

      fetchStoreClothes();
      setIsLoading(false);
    }, [id])
  );

  const cuttedClothes = showcaseClothes.slice(0, 4);

  if (!store) {
    return <Loading />;
  }

  return (
    <VStack flex={1}>
      <VStack pt="$14">
        <Box px="$6">
          <Image source={logoImg} alt="" w="$20" h="$10" alignSelf="center" />
        </Box>

        <Box w="$full" h="$px" bg="$base500" mt="$4" />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Box>
            {store.bannerImageUrl ? (
              <Image
                source={store.bannerImageUrl}
                alt=""
                w="$full"
                h="$32"
                overflow="hidden"
              />
            ) : (
              <LinearGradient
                colors={[theme.blueDark, theme.orangeDark, theme.redDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                  width: "100%",
                  height: 128,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text fontFamily="$specialTitle" color="$white" fontSize="$xl">
                  {store.name}
                </Text>
              </LinearGradient>
            )}

            <LinearGradient
              colors={[theme.blueDark, theme.orangeDark, theme.redDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                borderRadius: 9999,
                paddingVertical: 2,
                paddingHorizontal: 2,
                marginTop: -50,
                marginLeft: 24,
                width: 103,
                height: 103,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {store.profileImageUrl ? (
                <Image
                  source={store.profileImageUrl}
                  alt=""
                  rounded="$full"
                  w="$24"
                  h="$24"
                />
              ) : (
                <Center bg="$base700" w="$24" h="$24" rounded="$full">
                  <Storefront size={50} weight="bold" color={theme.base400} />
                </Center>
              )}
            </LinearGradient>
          </Box>

          <VStack mx="$6">
            <VStack mt="$3" mb="$6" gap="$3">
              <Text fontFamily="$title" color="$base100" fontSize="$2xl">
                {store.name}
              </Text>

              <HStack
                w="$full"
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack alignItems="center" gap="$2">
                  <Text fontFamily="$title" fontSize="$md" color="$base400">
                    {toTargetCustomerDisplay(store.targetCustomer)}
                  </Text>

                  <Box
                    w={5}
                    h={5}
                    bg="$base500"
                    rounded="$full"
                    flexShrink={0}
                  />

                  <Text fontFamily="$title" fontSize="$md" color="$base400">
                    {store.distanceInKilometers}
                  </Text>
                </HStack>

                <StoreRating rating={store.avgRating} />
              </HStack>

              <HStack w="$full" alignItems="center" gap="$2">
                <MapPin color={theme.base400} size={25} />

                <Text color={theme.base400} maxWidth={330} numberOfLines={2}>
                  {shortenAddress(store.address)}
                </Text>
              </HStack>

              <Button
                title={isFavorite ? "Favorito" : "Favoritar"}
                icon={Heart}
                iconWeight={isFavorite ? "fill" : "regular"}
                variantStyle={isFavorite ? "primary" : "secondary"}
                mt="$2"
                onPress={handleToggleFavoriteStore}
              />
            </VStack>

            <Box w="$full" h="$px" bg="$base500" mb="$6" />

            <SwitchShowcaseDetails
              display={display}
              onSwitch={() =>
                setDisplay(display === "showcase" ? "details" : "showcase")
              }
            />

            {display === "showcase" ? (
              <StoreShowcase
                clothes={cuttedClothes}
                onViewMoreClothes={handleViewMoreClothes}
              />
            ) : (
              <StoreInfo store={store} />
            )}
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
}

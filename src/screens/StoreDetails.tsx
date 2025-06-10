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

import MapPin from "phosphor-react-native/src/icons/MapPin";
import Heart from "phosphor-react-native/src/icons/Heart";

import bannerImg from "@/assets/banner-template.png";
import storeImg from "@/assets/store-template.png";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { shortenAddress } from "@/utils/addressFormatter";
import { Button } from "@/components/@ui/Button";
import { StoreRating } from "@/components/StoreRating";
import { SwitchShowcaseDetails } from "@/components/SwitchShowcaseDetails";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { EmptyList } from "@/components/EmptyList";
import { useClothes } from "@/hooks/useClothes";
import { ClotheSummary } from "@/components/ClotheSummary";
import { fetchClothesWithFilter } from "@/api/fetch-clothes-with-filter";
import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import { LinearGradient } from "expo-linear-gradient";

type RouteParams = {
  id: string;
};

export function StoreDetails() {
  const [showcaseClothes, setShowcaseClothes] = useState<ClotheSummaryDTO[]>(
    []
  );
  const [display, setDisplay] = useState<"showcase" | "details">("showcase");

  const cuttedClothes = showcaseClothes.slice(0, 4);

  const theme = gluestackUIConfig.tokens.colors;

  const route = useRoute();
  const { id } = route.params as RouteParams;

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  async function fetchStoreClothes() {
    const { clothes } = await fetchClothesWithFilter({ storeId: id });

    setShowcaseClothes(clothes);
  }

  function handleGoBack() {
    navigate("stores");
  }

  const address = {
    number: "350",
    cep: "88010000",
    street: "Rua Felipe Schmidt",
    neighborhood: "Centro",
    city: "Florianópolis",
  };

  useFocusEffect(
    useCallback(() => {
      setShowcaseClothes([]);

      console.log("store route id -> ", id);

      fetchStoreClothes();
    }, [])
  );

  return (
    <VStack flex={1} pt="$14">
      <Header title={"Brechó da Edna"} onGoBack={handleGoBack} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Box>
          <Image
            source={bannerImg}
            alt=""
            w="$full"
            h="$32"
            overflow="hidden"
          />

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
            <Image source={storeImg} alt="" rounded="$full" w="$24" h="$24" />
          </LinearGradient>
        </Box>

        <VStack mx="$6">
          <VStack mt="$3" mb="$6" gap="$3">
            <Text fontFamily="$title" color="$base100" fontSize="$2xl">
              Brechó da Edna
            </Text>

            <HStack
              w="$full"
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack alignItems="center" gap="$2">
                <Text fontFamily="$title" fontSize="$md" color="$base400">
                  Todos os públicos
                </Text>

                <Box w={5} h={5} bg="$base500" rounded="$full" flexShrink={0} />

                <Text fontFamily="$title" fontSize="$md" color="$base400">
                  5,1km
                </Text>
              </HStack>

              <StoreRating rating={4.9} />
            </HStack>

            <HStack w="$full" alignItems="center" gap="$2">
              <MapPin color={theme.base400} size={25} />

              <Text color={theme.base400}>{shortenAddress(address)}</Text>
            </HStack>

            <Button
              title="Favoritar"
              icon={Heart}
              variantStyle="secondary"
              mt="$2"
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
            <VStack>
              <HStack flexWrap="wrap" justifyContent="space-between" mb="$6">
                {cuttedClothes.map((item) => (
                  <ClotheSummary key={item.id} clothe={item} />
                ))}
              </HStack>
              {cuttedClothes.length === 0 && (
                <Center mt="$7">
                  <EmptyList
                    title="Nenhuma peça encontrada!"
                    subtitle="Esse brechó não possui nenhuma peça à venda no momento."
                  />
                </Center>
              )}
            </VStack>
          ) : (
            <Text>Informacoes</Text>
          )}
        </VStack>
      </ScrollView>
    </VStack>
  );
}

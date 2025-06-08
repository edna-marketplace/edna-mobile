import { Header } from "@/components/@ui/Header";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { Box, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";

import Star from "phosphor-react-native/src/icons/Star";
import MapPin from "phosphor-react-native/src/icons/MapPin";

import bannerImg from "@/assets/banner-template.png";
import storeImg from "@/assets/store-template.png";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

type RouteParams = {
  id: string;
};

export function StoreDetails() {
  const theme = gluestackUIConfig.tokens.colors;

  const route = useRoute();
  const { id } = route.params as RouteParams;

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigate("stores");
  }

  return (
    <VStack flex={1} pt="$14">
      <Header title={"Brechó da Edna"} onGoBack={handleGoBack} />

      <Box>
        <Image source={bannerImg} alt="" w="$full" h="$32" overflow="hidden" />

        <Image
          source={storeImg}
          alt=""
          rounded="$full"
          w="$24"
          h="$24"
          mt="-$10"
          ml="$6"
          borderWidth={4}
          borderColor="$base700"
        />
      </Box>

      <VStack mx="$6">
        <VStack mt="$3" gap="$3">
          <Text fontFamily="$title" color="$base100" fontSize="$2xl">
            Brechó da Edna
          </Text>

          <HStack w="$full" alignItems="center" justifyContent="space-between">
            <HStack alignItems="center" gap="$2">
              <Text fontFamily="$title" fontSize="$md" color="$base400">
                Todos os públicos
              </Text>

              <Box w={5} h={5} bg="$base500" rounded="$full" flexShrink={0} />

              <Text fontFamily="$title" fontSize="$md" color="$base400">
                5,1km
              </Text>
            </HStack>

            <HStack
              alignItems="center"
              gap="$2"
              px="$2"
              bg="$white"
              borderWidth={1}
              borderColor="$base500"
              rounded="$full"
            >
              {false ? (
                <Text
                  fontFamily="$title"
                  fontSize="$sm"
                  mt="$1"
                  color="$orangeDark"
                >
                  NOVO!
                </Text>
              ) : (
                <>
                  <Star size={15} weight="fill" color={theme.orangeDark} />

                  <Text
                    fontFamily="$title"
                    fontSize="$sm"
                    mt="$1"
                    color="$orangeDark"
                  >
                    {/* {store.avgRating.toLocaleString("pt-BR", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })} */}
                    4,9
                  </Text>
                </>
              )}
            </HStack>
          </HStack>

          <HStack w="$full" alignItems="center" gap="$2">
            <MapPin color={theme.base400} size={25} />

            <Text color={theme.base400}>
              Florianópolis - Av. Pequeno Príncipe, 123
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
}

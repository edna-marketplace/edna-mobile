import { fetchFeedClothes } from "@/api/fetch-feed-clothes";
import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import ArrowRight from "phosphor-react-native/src/icons/ArrowRight";
import { StoreAvatar } from "./StoreAvatar";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { Loading } from "./Loading";

export function FeedHomeSummary() {
  const [isLoading, setIsLoading] = useState(false);
  const [clothes, setClothes] = useState<ClotheSummaryDTO[]>([]);

  const theme = gluestackUIConfig.tokens.colors;

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleClotheDetails(id: string) {
    navigate("clothe", { id });
  }

  function handleFeed() {
    navigate("feed");
  }

  async function fetchClothes() {
    try {
      setIsLoading(true);
      const data = await fetchFeedClothes({});

      const cuttedClothes = data.clothes.slice(0, 5);

      setClothes(cuttedClothes);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchClothes();
    }, [])
  );

  return (
    <VStack>
      <Pressable onPress={handleFeed}>
        <Text
          fontFamily="$title"
          fontSize="$lg"
          color="$base200"
          pb="$2"
          ml="$6"
        >
          Feed
        </Text>
      </Pressable>

      {isLoading ? (
        <Box width="50%" h={250} alignItems="center">
          <Loading />
        </Box>
      ) : (
        <FlatList
          data={clothes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleClotheDetails(item.id)}>
              <LinearGradient
                colors={[theme.blueDark, theme.orangeDark, theme.redDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                  borderRadius: 8,
                  paddingVertical: 3,
                  paddingHorizontal: 3,
                  marginRight: 14,
                }}
              >
                <Box
                  key="content"
                  rounded="$md"
                  overflow="hidden"
                  bg="$background"
                  position="relative"
                >
                  <Image
                    w={150}
                    h={250}
                    source={item.imageURL}
                    objectFit="cover"
                    alt=""
                  />

                  <LinearGradient
                    colors={["transparent", "#000000a9"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      height: "50%",
                    }}
                  />

                  <Box position="absolute" bottom={0} p="$2">
                    <HStack
                      w="$full"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text fontFamily="$title" color="$white" mb="-$1">
                        {(item.priceInCents / 100).toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Text>

                      <StoreAvatar imageURL={item.storeImageURL} size="xs" />
                    </HStack>

                    <Text
                      fontFamily="$default"
                      fontSize="$sm"
                      color="$white"
                      mb="-$1"
                      numberOfLines={1}
                      w={120}
                    >
                      {item.name}
                    </Text>
                  </Box>
                </Box>
              </LinearGradient>
            </Pressable>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24 }}
          ListFooterComponent={() => (
            <Pressable flex={1} onPress={handleFeed}>
              <Center flex={1} ml="$4" mr="$2">
                <Box
                  w={50}
                  h={50}
                  rounded="$full"
                  bg="$base100"
                  justifyContent="center"
                  alignItems="center"
                >
                  <ArrowRight color={theme.white} weight="bold" />
                </Box>
              </Center>
            </Pressable>
          )}
        />
      )}
    </VStack>
  );
}

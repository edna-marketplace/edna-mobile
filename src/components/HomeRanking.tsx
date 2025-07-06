import {
  Box,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Card } from "./@ui/Card";
import { FlatList } from "react-native";
import BookmarkSimple from "phosphor-react-native/src/icons/BookmarkSimple";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { formatMonthYear } from "@/utils/formatMonthYear";
import { useCallback, useState } from "react";
import {
  GetClotheRankingClothesResponse,
  getRankingClothes,
} from "@/api/get-ranking-clothes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Loading } from "./Loading";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";

export function HomeRanking() {
  const [isLoading, setIsLoading] = useState(false);
  const [ranking, setRanking] = useState<GetClotheRankingClothesResponse[]>([]);

  const theme = gluestackUIConfig.tokens.colors;

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  async function fetchRankingClothes() {
    try {
      setIsLoading(true);
      const data = await getRankingClothes();

      setRanking(data);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchRankingClothes();
    }, [])
  );

  return (
    <>
      <HStack alignItems="center" mb="-$3" gap="$3">
        <Text fontFamily="$title" fontSize="$lg" color="$base200" ml="$6">
          Ranking
        </Text>

        <Text fontFamily="$default" color="$base300">
          {formatMonthYear(new Date())}
        </Text>
      </HStack>
      {isLoading ? (
        <Loading />
      ) : (
        <Card mx="$6" p="$8" w="88%">
          <FlatList
            data={ranking}
            keyExtractor={(item) => item.clotheId}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => navigate("clothe", { id: item.clotheId })}
              >
                <HStack
                  gap="$6"
                  pb={index !== ranking.length - 1 ? "$6" : "$0"}
                  mb={index !== ranking.length - 1 ? "$6" : "$0"}
                  borderBottomWidth={index !== ranking.length - 1 ? 1 : 0}
                  borderColor="$base500"
                >
                  <VStack justifyContent="center" alignItems="center" gap="$1">
                    <Box
                      bg={
                        index === 0
                          ? "$yellow500"
                          : index === 1
                          ? "$trueGray400"
                          : "$amber700"
                      }
                      padding="$2"
                      rounded="$full"
                      h={40}
                      w={40}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text fontFamily="$title" color="$white">
                        {index + 1}
                      </Text>
                    </Box>

                    <HStack alignItems="center" gap="$2">
                      <Text
                        fontFamily="$title"
                        fontSize="$sm"
                        color="$base300"
                        mb="-$1"
                      >
                        {item.savedCount}
                      </Text>
                      <BookmarkSimple
                        weight="bold"
                        color={theme.base300}
                        size={14}
                      />
                    </HStack>
                  </VStack>

                  <HStack gap="$3">
                    <Image
                      source={item.imageUrl}
                      h={75}
                      w={75}
                      alt=""
                      rounded="$md"
                    />

                    <VStack justifyContent="center">
                      <Text
                        fontFamily="$title"
                        fontSize="$lg"
                        maxWidth={130}
                        numberOfLines={1}
                      >
                        {(item.priceInCents / 100).toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Text>

                      <HStack w={112} justifyContent="space-between">
                        <Text numberOfLines={1} w={100}>
                          {item.name}
                        </Text>
                        <BookmarkSimple
                          weight={
                            item.savedByCurrentUser === true
                              ? "fill"
                              : "regular"
                          }
                          color={
                            item.savedByCurrentUser
                              ? theme.blueDark
                              : theme.base100
                          }
                        />
                      </HStack>
                    </VStack>
                  </HStack>
                </HStack>
              </Pressable>
            )}
            ListEmptyComponent={() => (
              <Text alignSelf="center" textAlign="center" color="$base300">
                Nenhuma peça foi salva no mês atual ainda.
              </Text>
            )}
          />
        </Card>
      )}
    </>
  );
}

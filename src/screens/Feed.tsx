import {
  Box,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React, { useCallback, useState } from "react";
import { Dimensions, FlatList, StatusBar } from "react-native";

import { fetchFeedClothes } from "@/api/fetch-feed-clothes";
import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StoreAvatar } from "@/components/StoreAvatar";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { PriceTag } from "@/components/PriceTag";
import BookmarkSimple from "phosphor-react-native/src/icons/BookmarkSimple";
import { getBrandDisplayName } from "@/utils/getBrandDisplayName";
import { getSizeDisplayName } from "@/utils/getSizeDisplayName";

const { height: screenHeight } = Dimensions.get("window");

export function Feed() {
  const [clothes, setClothes] = useState<ClotheSummaryDTO[]>([]);

  const theme = gluestackUIConfig.tokens.colors;

  async function fetchClothes() {
    const data = await fetchFeedClothes({});

    setClothes(data.clothes);
  }

  useFocusEffect(
    useCallback(() => {
      fetchClothes();
    }, [])
  );

  return (
    <>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={clothes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Box h={screenHeight} bg="$black" position="relative">
            <Image source={item.imageURL} w="$full" h="$full" alt="" />

            <LinearGradient
              colors={["#000", "transparent"]}
              start={{ x: 0, y: -0.5 }}
              end={{ x: 0, y: 1 }}
              style={{
                position: "absolute",
                top: 0,
                width: "100%",
                height: 60,
              }}
            />

            <LinearGradient
              colors={["transparent", "#000"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: 120,
              }}
            />

            <Box position="absolute" bottom="$10" px="$6" py="$4">
              <HStack
                w="$full"
                alignItems="center"
                justifyContent="space-between"
              >
                <VStack gap="$4" alignSelf="flex-end">
                  <HStack alignItems="center" gap="$4">
                    <StoreAvatar imageURL={item.storeImageURL} />

                    <Text fontFamily="$title" fontSize="$md" color="$white">
                      {item.storeName}
                    </Text>
                  </HStack>

                  <Text fontFamily="$default" fontSize="$lg" color="$white">
                    {item.name}
                  </Text>
                </VStack>

                <VStack gap="$4" alignItems="center">
                  <VStack alignItems="center" gap="$1">
                    <PriceTag priceInCents={item.priceInCents} />

                    <Text
                      fontFamily="$title"
                      fontSize="$sm"
                      color="$white"
                      shadowColor="$black"
                    >
                      Ver peça
                    </Text>
                  </VStack>

                  <HStack alignItems="center" gap="$2">
                    <Text
                      fontFamily="$title"
                      fontSize="$sm"
                      color="$white"
                      flexShrink={1}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      minWidth={1}
                      maxWidth={80}
                    >
                      {getBrandDisplayName(item)}
                    </Text>

                    <Box
                      w={5}
                      h={5}
                      bg="$white"
                      rounded="$full"
                      flexShrink={0}
                    />

                    <Text
                      fontFamily="$title"
                      fontSize="$sm"
                      color="$white"
                      flexShrink={1}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      minWidth={1}
                      maxWidth={30}
                    >
                      {getSizeDisplayName(item)}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          </Box>
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={screenHeight}
        snapToAlignment="start"
        decelerationRate="normal"
      />
    </>
  );
}

import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React, { useCallback, useRef, useState } from "react";
import { Dimensions, FlatList, StatusBar } from "react-native";

import { fetchFeedClothes } from "@/api/fetch-feed-clothes";
import { ClotheBrandSize } from "@/components/ClotheBrandSize";
import { PriceTag } from "@/components/PriceTag";
import { StoreAvatar } from "@/components/StoreAvatar";
import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { Button } from "@/components/@ui/Button";
import ArrowRight from "phosphor-react-native/src/icons/ArrowRight";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const { height: screenHeight } = Dimensions.get("window");

export function Feed() {
  const tabBarHeight = useBottomTabBarHeight();

  const [clothes, setClothes] = useState<ClotheSummaryDTO[]>([]);

  const flatListRef = useRef<FlatList>(null);

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleStoreDetails(storeId: string) {
    navigate("store", { id: storeId });
  }

  function handleClotheDetails(clotheId: string) {
    navigate("clothe", { id: clotheId });
  }

  function handleCategories() {
    navigate("categories");
  }

  async function fetchClothes() {
    const data = await fetchFeedClothes({});

    setClothes(data.clothes);
  }

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");

      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });

      fetchClothes();

      return () => {
        StatusBar.setBarStyle("dark-content");
      };
    }, [])
  );

  return (
    <FlatList
      ref={flatListRef}
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
            end={{ x: 0, y: 2 }}
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: 120,
            }}
          />

          <Box position="absolute" bottom={0} px="$6" pb="$14">
            <HStack
              w="$full"
              alignItems="center"
              justifyContent="space-between"
            >
              <VStack gap="$4" alignSelf="flex-end">
                <Pressable onPress={() => handleStoreDetails(item.storeId)}>
                  <HStack alignItems="center" gap="$4">
                    <StoreAvatar imageURL={item.storeImageURL} />

                    <Text
                      fontFamily="$title"
                      fontSize="$md"
                      color="$white"
                      maxWidth={160}
                      numberOfLines={1}
                    >
                      {item.storeName}
                    </Text>
                  </HStack>
                </Pressable>

                <Text
                  fontFamily="$default"
                  fontSize="$lg"
                  color="$white"
                  maxWidth={220}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
              </VStack>

              <VStack gap="$4" alignItems="center">
                <VStack alignItems="center" gap="$1">
                  <Pressable onPress={() => handleClotheDetails(item.id)}>
                    <PriceTag priceInCents={item.priceInCents} />
                  </Pressable>

                  <Text
                    fontFamily="$title"
                    fontSize="$sm"
                    color="$white"
                    shadowColor="$black"
                  >
                    Ver peça
                  </Text>
                </VStack>

                <ClotheBrandSize clothe={item} textColor="$white" />
              </VStack>
            </HStack>
          </Box>
        </Box>
      )}
      ListFooterComponent={() => (
        <Center py="$6" px="$12" bg="$base700">
          <Text
            fontFamily="$specialTitle"
            fontSize="$2xl"
            color="$base100"
            mb="$4"
          >
            Por hoje é isso!
          </Text>

          <Text fontFamily="$default" textAlign="center" color="$base100">
            Volte mais tarde para descobrir novas peças, ou explore mais peças
            na seção de categorias!
          </Text>

          <Button
            mt="$6"
            title="Categorias"
            icon={ArrowRight}
            onPress={handleCategories}
          />
        </Center>
      )}
      contentContainerStyle={{
        paddingBottom: tabBarHeight, // <-- dynamically pad for the tab bar
      }}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToInterval={screenHeight}
      snapToAlignment="start"
      decelerationRate="fast"
    />
  );
}

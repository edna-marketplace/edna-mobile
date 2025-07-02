import { Box, Image, VStack } from "@gluestack-ui/themed";

import logoImg from "@/assets/logo/logo.png";
import { CategoriesHomeSummary } from "@/components/CategoriesHomeSummary";
import { FeedHomeSummary } from "@/components/FeedHomeSummary";
import { HomeRanking } from "@/components/HomeRanking";
import { StoreHomeSummary } from "@/components/StoreHomeSummary";
import { useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native";

export function Home() {
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, [])
  );

  return (
    <>
      <VStack pt="$14">
        <Box px="$6">
          <Image source={logoImg} alt="" w="$20" h="$10" alignSelf="center" />
        </Box>

        <Box w="$full" h="$px" bg="$base500" mt="$4" />
      </VStack>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack pt="$4" gap="$6">
          <FeedHomeSummary />

          <CategoriesHomeSummary />

          <HomeRanking />

          <StoreHomeSummary />
        </VStack>
      </ScrollView>
    </>
  );
}

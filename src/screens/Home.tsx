import { Box, Image, ScrollView, VStack } from "@gluestack-ui/themed";

import logoImg from "@/assets/logo/logo.png";
import { CategoriesHomeSummary } from "@/components/CategoriesHomeSummary";
import { FeedHomeSummary } from "@/components/FeedHomeSummary";
import { HomeRanking } from "@/components/HomeRanking";

export function Home() {
  return (
    <>
      <VStack pt="$14">
        <Box px="$6">
          <Image source={logoImg} alt="" w="$20" h="$10" alignSelf="center" />
        </Box>

        <Box w="$full" h="$px" bg="$base500" mt="$4" />
      </VStack>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack pt="$4" gap="$6">
          <FeedHomeSummary />

          <CategoriesHomeSummary />

          <HomeRanking />
        </VStack>
      </ScrollView>
    </>
  );
}

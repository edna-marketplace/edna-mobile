import { Button } from "@/components/@ui/Button";
import { Loading } from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { Box, Center, Image, Text, VStack } from "@gluestack-ui/themed";
import { useState } from "react";

import logoImg from "@/assets/logo/logo.png";
import { FeedHomeSummary } from "@/components/FeedHomeSummary";
import { CategoriesHomeSummary } from "@/components/CategoriesHomeSummary";

export function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { signOut } = useAuth();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <VStack pt="$14">
            <Box px="$6">
              <Image
                source={logoImg}
                alt=""
                w="$20"
                h="$10"
                alignSelf="center"
              />
            </Box>

            <Box w="$full" h="$px" bg="$base500" mt="$4" />
          </VStack>

          <VStack pt="$4" gap="$6">
            <FeedHomeSummary />

            <CategoriesHomeSummary />
          </VStack>
        </>
      )}
    </>
  );
}

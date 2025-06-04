import { StoreSummaryDTO } from "@/dtos/StoreSummaryDTO";
import {
  Box,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { ComponentProps, useState } from "react";

import { toTargetCustomerDisplay } from "@/utils/toTargetCustomerDisplay";
import { LinearGradient } from "expo-linear-gradient";
import Storefront from "phosphor-react-native/src/icons/Storefront";
import Star from "phosphor-react-native/src/icons/Star";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import Heart from "phosphor-react-native/src/icons/Heart";

type Props = ComponentProps<typeof Pressable> & {
  store: StoreSummaryDTO;
  onFavorite: (id: string) => void;
};

export function StoreSummary({ store, onFavorite }: Props) {
  const [isFavorite, setIsFavorite] = useState(store.favorite);

  const theme = gluestackUIConfig.tokens.colors;

  const targetCustomerDisplayName = toTargetCustomerDisplay(
    store.targetCustomer
  );

  async function toggleFavoriteStore() {
    setIsFavorite(!isFavorite);

    await onFavorite(store.id);
  }

  return (
    <Pressable
      w="$full"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      mb="$8"
    >
      <HStack gap="$3" alignItems="center">
        <LinearGradient
          colors={[theme.blueDark, theme.orangeDark, theme.redDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            borderRadius: 9999,
            paddingVertical: 2,
            paddingHorizontal: 2,
            width: 56,
            height: 56,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box key="content" rounded="$xl" overflow="hidden" bg="$background">
            {store.profileImageUrl ? (
              <Image
                source={store.profileImageUrl}
                w={50}
                h={50}
                rounded="$full"
                alt=""
              />
            ) : (
              <Storefront size={30} weight="fill" color={theme.white} />
            )}
          </Box>
        </LinearGradient>

        <VStack>
          <Text fontFamily="$title" numberOfLines={1}>
            {store.name}
          </Text>
          <HStack alignItems="center" gap="$2">
            <HStack
              alignItems="center"
              gap="$1"
              px="$2"
              bg="$white"
              borderWidth={1}
              borderColor="$base500"
              rounded="$full"
            >
              {store.avgRating === 0 ? (
                <Text
                  fontFamily="$title"
                  fontSize="$xs"
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
                    fontSize="$xs"
                    mt="$1"
                    color="$orangeDark"
                  >
                    {store.avgRating.toLocaleString("pt-BR", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                  </Text>
                </>
              )}
            </HStack>

            <Box w={5} h={5} bg="$base500" rounded="$full" flexShrink={0} />

            <Text fontFamily="$title" fontSize="$xs" color="$base400">
              {targetCustomerDisplayName}
            </Text>

            <Box w={5} h={5} bg="$base500" rounded="$full" flexShrink={0} />

            {store.distanceToCustomerInMeters.length >= 8 ? (
              <Text fontFamily="$title" fontSize="$xs" color="$base400">
                +100km
              </Text>
            ) : (
              <Text fontFamily="$title" fontSize="$xs" color="$base400">
                {store.distanceToCustomerInMeters}
              </Text>
            )}
          </HStack>
        </VStack>
      </HStack>

      <Pressable onPress={toggleFavoriteStore}>
        <Heart
          color={isFavorite ? theme.redDark : theme.base100}
          weight={isFavorite ? "fill" : "regular"}
        />
      </Pressable>
    </Pressable>
  );
}

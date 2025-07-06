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
import Heart from "phosphor-react-native/src/icons/Heart";
import Storefront from "phosphor-react-native/src/icons/Storefront";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { StoreRating } from "./StoreRating";

type Props = ComponentProps<typeof Pressable> & {
  store: StoreSummaryDTO;
  isStoreFavorite: boolean;
  onFavorite: (id: string) => void;
};

export function StoreSummary({
  store,
  isStoreFavorite,
  onFavorite,
  ...rest
}: Props) {
  const [isFavorite, setIsFavorite] = useState(isStoreFavorite);

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
      {...rest}
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
            width: 52,
            height: 52,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box key="content" rounded="$xl" overflow="hidden" bg="$background">
            {store.profileImageUrl ? (
              <Image
                source={store.profileImageUrl}
                w={48}
                h={48}
                rounded="$full"
                alt=""
              />
            ) : (
              <Storefront size={30} weight="fill" color={theme.white} />
            )}
          </Box>
        </LinearGradient>

        <VStack>
          <Text
            fontFamily="$title"
            numberOfLines={1}
            ellipsizeMode="tail"
            maxWidth={230}
          >
            {store.name}
          </Text>
          <HStack alignItems="center" gap="$2">
            <StoreRating rating={store.avgRating} size="sm" />

            <Box w={5} h={5} bg="$base500" rounded="$full" flexShrink={0} />

            <Text fontFamily="$title" fontSize="$xs" color="$base400">
              {targetCustomerDisplayName}
            </Text>

            {store.distanceToCustomerInMeters ? (
              store.distanceToCustomerInMeters.length >= 8 ? (
                <>
                  <Box
                    w={5}
                    h={5}
                    bg="$base500"
                    rounded="$full"
                    flexShrink={0}
                  />
                  <Text fontFamily="$title" fontSize="$xs" color="$base400">
                    +100km
                  </Text>
                </>
              ) : (
                <>
                  <Box
                    w={5}
                    h={5}
                    bg="$base500"
                    rounded="$full"
                    flexShrink={0}
                  />
                  <Text fontFamily="$title" fontSize="$xs" color="$base400">
                    {store.distanceToCustomerInMeters}
                  </Text>
                </>
              )
            ) : (
              <Box />
            )}
          </HStack>
        </VStack>
      </HStack>

      <Pressable onPress={toggleFavoriteStore} mt="-$4">
        <Heart
          color={isFavorite ? theme.redDark : theme.base100}
          weight={isFavorite ? "fill" : "regular"}
        />
      </Pressable>
    </Pressable>
  );
}

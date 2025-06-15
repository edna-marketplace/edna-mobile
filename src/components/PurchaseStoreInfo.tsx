import { ClotheDetailsDTO } from "@/dtos/ClotheDetailsDTO";
import { Box, HStack, Text, VStack } from "@gluestack-ui/themed";
import { StoreAvatar } from "./StoreAvatar";
import { StoreRating } from "./StoreRating";
import { shortenAddress } from "@/utils/addressFormatter";

type Props = {
  clothe: ClotheDetailsDTO;
};

export function PurchaseStoreInfo({ clothe }: Props) {
  return (
    <HStack gap="$4">
      <StoreAvatar imageURL={clothe.storeProfileImageUrl} size="lg" />

      <VStack>
        <HStack gap="$4" alignItems="center">
          <Text
            fontFamily="$title"
            color="$base100"
            ellipsizeMode="tail"
            numberOfLines={1}
            minWidth={1}
            maxWidth="$56"
          >
            {clothe.storeName}
          </Text>

          <Box mb="$1">
            <StoreRating rating={clothe.storeAvgRating} size="sm" />
          </Box>
        </HStack>

        <Text
          fontFamily="$default"
          color="$base400"
          maxWidth="$72"
          fontSize="$sm"
        >
          {shortenAddress(clothe.storeAddress)}
        </Text>
      </VStack>
    </HStack>
  );
}

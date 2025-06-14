import { ClotheDetailsDTO } from "@/dtos/ClotheDetailsDTO";
import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import { getBrandDisplayName } from "@/utils/getBrandDisplayName";
import { getSizeDisplayName } from "@/utils/getSizeDisplayName";
import { Box, HStack, Text } from "@gluestack-ui/themed";

type Props = {
  clothe: ClotheSummaryDTO | ClotheDetailsDTO;
  size?: "sm" | "md";
};

export function ClotheBrandSize({ clothe, size = "md" }: Props) {
  return (
    <HStack alignItems="center" gap="$2">
      <Text
        fontFamily="$title"
        fontSize={size === "md" ? "$md" : "$sm"}
        color="$base400"
        flexShrink={1}
        numberOfLines={1}
        ellipsizeMode="tail"
        minWidth={1}
        maxWidth="$20"
      >
        {getBrandDisplayName(clothe)}
      </Text>

      <Box w={5} h={5} bg="$base400" rounded="$full" flexShrink={0} />

      <Text
        fontFamily="$title"
        fontSize={size === "md" ? "$md" : "$sm"}
        color="$base400"
        flexShrink={1}
        numberOfLines={1}
        ellipsizeMode="tail"
        minWidth={40}
      >
        {getSizeDisplayName(clothe)}
      </Text>
    </HStack>
  );
}

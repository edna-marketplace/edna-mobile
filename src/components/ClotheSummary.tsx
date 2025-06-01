import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import { HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { Box } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";
import Dot from "phosphor-react-native/src/icons/Dot";
import { LinearGradient } from "expo-linear-gradient";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

type Props = {
  clothe: ClotheSummaryDTO;
};

export function ClotheSummary({ clothe }: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  return (
    <Pressable w={160} gap="$2" mb="$3">
      <LinearGradient
        colors={[theme.blueDark, theme.orangeDark, theme.redDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          borderRadius: 12,
          padding: 3,
        }}
      >
        <Box key="content" rounded="$lg" overflow="hidden" bg="$background">
          <Image
            w={160}
            h={160}
            source={clothe.imageURL}
            objectFit="cover"
            alt=""
          />
        </Box>
      </LinearGradient>

      <HStack justifyContent="space-between" alignItems="center">
        <Text fontFamily="$title" fontSize="$md" color="$base100">
          {(clothe.priceInCents / 100).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>

        <Image w={20} h={20} source={clothe.storeImageURL} alt="" />
      </HStack>

      <VStack gap="$1">
        <Text
          numberOfLines={1}
          fontFamily="$title"
          fontSize="$sm"
          color="$base100"
        >
          {clothe.name}
        </Text>

        <HStack alignItems="center" gap="$2">
          <Text
            fontFamily="$title"
            fontSize="$sm"
            color="$base300"
            flexShrink={1}
            numberOfLines={1}
            ellipsizeMode="tail"
            minWidth={1}
          >
            {clothe.brand}
          </Text>

          <Box w={5} h={5} bg="$base400" rounded="$full" flexShrink={0} />

          <Text
            fontFamily="$title"
            fontSize="$sm"
            color="$base300"
            flexShrink={1}
            numberOfLines={1}
            ellipsizeMode="tail"
            minWidth={40}
          >
            {clothe.size}
          </Text>
        </HStack>
      </VStack>
    </Pressable>
  );
}

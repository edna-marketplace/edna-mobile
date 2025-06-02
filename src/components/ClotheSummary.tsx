import { filters } from "@/data/clothe-filters";
import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import {
  Box,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import UserCircle from "phosphor-react-native/src/icons/UserCircle";

type Props = {
  clothe: ClotheSummaryDTO;
};

export function ClotheSummary({ clothe }: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  const brandDisplay = filters[1].options.find(
    (b) => b.value === clothe.brand
  )?.displayName;

  const sizeDisplay = filters[2].options.find(
    (b) => b.value === clothe.size
  )?.displayName;

  return (
    <Pressable w="46%" gap="$1" mb="$3">
      <LinearGradient
        colors={[theme.blueDark, theme.orangeDark, theme.redDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          borderRadius: 14,
          paddingVertical: 3,
          paddingHorizontal: 3,
        }}
      >
        <Box key="content" rounded="$xl" overflow="hidden" bg="$background">
          <Image
            w="100%"
            h={153}
            source={clothe.imageURL}
            objectFit="cover"
            alt=""
          />
        </Box>
      </LinearGradient>

      <HStack justifyContent="space-between" alignItems="center" mt="$1">
        <Text fontFamily="$title" fontSize="$md" color="$base100">
          {(clothe.priceInCents / 100).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>

        <Box rounded="$full" overflow="hidden">
          {clothe.storeImageURL ? (
            <Image w={20} h={20} source={clothe.storeImageURL} alt="" />
          ) : (
            <UserCircle weight="fill" color={theme.base300} />
          )}
        </Box>
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
            {brandDisplay}
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
            {sizeDisplay}
          </Text>
        </HStack>
      </VStack>
    </Pressable>
  );
}

import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import { getBrandDisplayName } from "@/utils/getBrandDisplayName";
import { getSizeDisplayName } from "@/utils/getSizeDisplayName";
import {
  Box,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import Storefront from "phosphor-react-native/src/icons/Storefront";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";

type Props = {
  clothe: ClotheSummaryDTO;
};

export function ClotheSummary({ clothe }: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigateClotheDetails() {
    navigate("clothe", { id: clothe.id });
  }

  return (
    <Pressable w="46%" gap="$1" mb="$3" onPress={handleNavigateClotheDetails}>
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
        <Text
          fontFamily="$title"
          fontSize="$md"
          color="$base100"
          flexShrink={1}
          numberOfLines={1}
          ellipsizeMode="tail"
          maxWidth={130}
        >
          {(clothe.priceInCents / 100).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>

        <LinearGradient
          colors={[theme.blueDark, theme.orangeDark, theme.redDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            borderRadius: 9999,
            paddingVertical: 2,
            paddingHorizontal: 2,
            width: 23,
            height: 23,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {clothe.storeImageURL ? (
            <Image
              source={clothe.storeImageURL}
              w={20}
              h={20}
              rounded="$full"
              alt=""
            />
          ) : (
            <Storefront size={15} weight="fill" color={theme.white} />
          )}
        </LinearGradient>
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
            {getBrandDisplayName(clothe)}
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
            {getSizeDisplayName(clothe)}
          </Text>
        </HStack>
      </VStack>
    </Pressable>
  );
}

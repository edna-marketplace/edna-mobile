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
import BookmarkSimple from "phosphor-react-native/src/icons/BookmarkSimple";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Pressable> & {
  clothe: ClotheSummaryDTO;
  onRemoveSavedStatus: (id: string) => void;
};

export function SavedClothe({ clothe, onRemoveSavedStatus, ...rest }: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  return (
    <Pressable {...rest}>
      <HStack alignItems="center" justifyContent="space-between" mb="$8">
        <HStack alignItems="center" gap="$4">
          <Box w={100} gap="$4">
            <LinearGradient
              colors={[theme.blueDark, theme.orangeDark, theme.redDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{
                borderRadius: 14,
                paddingVertical: 2,
                paddingHorizontal: 2,
              }}
            >
              <Box
                key="content"
                rounded="$xl"
                overflow="hidden"
                bg="$background"
              >
                <Image
                  w="100%"
                  h={100}
                  source={clothe.imageURL}
                  objectFit="cover"
                  alt=""
                />
              </Box>
            </LinearGradient>
          </Box>

          <VStack gap="$1">
            <Text fontFamily="$default" color="$base200">
              {clothe.name}
            </Text>

            <Text fontFamily="$title" fontSize="$lg" color="$base100">
              {(clothe.priceInCents / 100).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>

            <HStack alignItems="center" gap="$3">
              <Text fontFamily="$default" fontSize="$sm" color="$base200">
                {clothe.storeName}
              </Text>
            </HStack>
          </VStack>
        </HStack>

        <Pressable
          alignItems="center"
          justifyContent="center"
          mr="$3"
          onPress={() => onRemoveSavedStatus(clothe.id)}
        >
          <BookmarkSimple size={30} weight="fill" color={theme.blueDark} />
        </Pressable>
      </HStack>
    </Pressable>
  );
}

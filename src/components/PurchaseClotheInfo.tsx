import { ClotheDetailsDTO } from "@/dtos/ClotheDetailsDTO";
import { Card } from "./@ui/Card";
import { Box, Image, Text, VStack } from "@gluestack-ui/themed";
import { ClotheBrandSize } from "./ClotheBrandSize";

type Props = {
  clothe: ClotheDetailsDTO;
};

export function PurchaseClotheInfo({ clothe }: Props) {
  return (
    <Card alignItems="center" p="$3">
      <Box
        w="$20"
        h="$20"
        rounded="$md"
        overflow="hidden"
        borderWidth={1}
        borderColor="$base500"
      >
        <Image source={clothe.images[0].url} alt="" w="$full" h="$full" />
      </Box>

      <VStack>
        <Text
          fontFamily="$title"
          color="$base100"
          fontSize="$sm"
          maxWidth={220}
        >
          {clothe.name}
        </Text>

        <ClotheBrandSize clothe={clothe} size="sm" />

        <Text fontFamily="$title" color="$base100" fontSize="$lg" pt="$2">
          {(clothe.priceInCents / 100).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </VStack>
    </Card>
  );
}

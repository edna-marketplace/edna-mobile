import { HStack, Text } from "@gluestack-ui/themed";
import Star from "phosphor-react-native/src/icons/Star";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

type Props = {
  size?: "md" | "sm";
  rating: number;
};

export function StoreRating({ rating, size = "md" }: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  return (
    <HStack
      alignItems="center"
      gap={size === "md" ? "$2" : "$1"}
      px="$2"
      bg="$white"
      borderWidth={1}
      borderColor="$base500"
      rounded="$full"
    >
      {rating === 0 ? (
        <Text
          fontFamily="$title"
          fontSize={size === "md" ? "$sm" : "$xs"}
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
            fontSize={size === "md" ? "$sm" : "$xs"}
            mt="$1"
            color="$orangeDark"
          >
            {rating.toLocaleString("pt-BR", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
          </Text>
        </>
      )}
    </HStack>
  );
}

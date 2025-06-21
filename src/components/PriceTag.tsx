import { LinearGradient } from "expo-linear-gradient";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Box, Text } from "@gluestack-ui/themed";

type Props = {
  priceInCents: number;
};

export function PriceTag({ priceInCents }: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  return (
    <LinearGradient
      colors={[theme.blueDark, theme.orangeDark, theme.redDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        borderRadius: 10,
        paddingVertical: 4.5,
        paddingHorizontal: 4.5,
      }}
    >
      <Box
        alignItems="center"
        justifyContent="center"
        bg="$white"
        py="$1"
        px="$3"
        rounded="$md"
      >
        <Text fontFamily="$title" fontSize="$md" color="$black" mb="-$1">
          {(priceInCents / 100).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </Box>
    </LinearGradient>
  );
}

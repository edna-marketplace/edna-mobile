import { Box, Image } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import Storefront from "phosphor-react-native/src/icons/Storefront";

type Props = {
  imageURL?: string | null;
  size?: "xs" | "sm" | "md" | "lg";
};

export function StoreAvatar({ imageURL, size = "md" }: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  return (
    <LinearGradient
      colors={[theme.blueDark, theme.orangeDark, theme.redDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        borderRadius: 9999,
        paddingVertical: 2,
        paddingHorizontal: 2,
        width:
          size === "xs" ? 23 : size === "sm" ? 33 : size === "md" ? 44 : 54,
        height:
          size === "xs" ? 23 : size === "sm" ? 33 : size === "md" ? 44 : 54,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box key="content" rounded="$xl" overflow="hidden" bg="$background">
        {imageURL ? (
          <Image
            source={imageURL}
            w={
              size === "xs" ? 20 : size === "sm" ? 30 : size === "md" ? 40 : 50
            }
            h={
              size === "xs" ? 20 : size === "sm" ? 30 : size === "md" ? 40 : 50
            }
            rounded="$full"
            alt=""
          />
        ) : (
          <Storefront
            size={size === "xs" ? 16 : size === "sm" ? 23 : 30}
            weight="fill"
            color={theme.white}
          />
        )}
      </Box>
    </LinearGradient>
  );
}

import { Box, Image } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import Storefront from "phosphor-react-native/src/icons/Storefront";

type Props = {
  imageURL?: string | null;
};

export function StoreAvatar({ imageURL }: Props) {
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
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box key="content" rounded="$xl" overflow="hidden" bg="$background">
        {imageURL ? (
          <Image source={imageURL} w={40} h={40} rounded="$full" alt="" />
        ) : (
          <Storefront size={30} weight="fill" color={theme.white} />
        )}
      </Box>
    </LinearGradient>
  );
}

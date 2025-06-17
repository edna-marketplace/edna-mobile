import { Box, Button, HStack, Pressable, Text } from "@gluestack-ui/themed";
import CaretLeft from "phosphor-react-native/src/icons/CaretLeft";
import { gluestackUIConfig } from "../../../config/gluestack-ui.config";

type Props = {
  title: string;
  onGoBack?: () => void;
};

export function Header({ title, onGoBack }: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  return (
    <HStack
      alignItems="center"
      justifyContent="center"
      pb="$4"
      borderBottomWidth={1}
      borderColor="$base500"
      position="relative"
    >
      {onGoBack && (
        <Pressable position="absolute" left={24} bottom={20} onPress={onGoBack}>
          <CaretLeft color={theme.base100} />
        </Pressable>
      )}
      <Box w={onGoBack ? "65%" : "85%"}>
        <Text
          fontFamily="$specialTitle"
          textAlign={onGoBack ? "center" : "left"}
          color="$base100"
          fontSize="$2xl"
          numberOfLines={1}
        >
          {title}
        </Text>
      </Box>
    </HStack>
  );
}

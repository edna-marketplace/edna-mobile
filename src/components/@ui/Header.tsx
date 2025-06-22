import { Box, Button, HStack, Pressable, Text } from "@gluestack-ui/themed";
import CaretLeft from "phosphor-react-native/src/icons/CaretLeft";
import { gluestackUIConfig } from "../../../config/gluestack-ui.config";
import SignOut from "phosphor-react-native/src/icons/SignOut";

type Props = {
  title: string;
  onGoBack?: () => void;
  onSignOut?: () => void;
};

export function Header({ title, onGoBack, onSignOut }: Props) {
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

      {onSignOut && (
        <Pressable
          position="absolute"
          right={24}
          bottom={20}
          onPress={onSignOut}
        >
          <SignOut size={28} color={theme.base100} />
        </Pressable>
      )}
    </HStack>
  );
}

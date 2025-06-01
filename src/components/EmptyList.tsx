import { Text, VStack } from "@gluestack-ui/themed";
import { Button } from "./@ui/Button";

type Props = {
  title: string;
  subtitle: string;
  callToActionButtonTitle?: string;
  onCallToAction?: () => void;
};

export function EmptyList({
  title,
  subtitle,
  callToActionButtonTitle,
  onCallToAction,
}: Props) {
  return (
    <VStack flex={1} px="$4" alignItems="center" justifyContent="center">
      <Text
        fontFamily="$title"
        fontSize="$lg"
        textAlign="center"
        color="$base300"
      >
        {title}
      </Text>

      <Text
        fontFamily="$default"
        fontSize="$md"
        textAlign="center"
        color="$base400"
      >
        {subtitle}
      </Text>

      {callToActionButtonTitle && (
        <Button
          variantStyle="primary"
          title={callToActionButtonTitle}
          mt="$6"
          onPress={onCallToAction}
        />
      )}
    </VStack>
  );
}

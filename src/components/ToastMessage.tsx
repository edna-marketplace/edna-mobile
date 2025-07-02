import {
  Icon,
  Pressable,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from "@gluestack-ui/themed";
import X from "phosphor-react-native/src/icons/X";

type Props = {
  id: string;
  title: string;
  description?: string;
  action?: "error" | "success";
  onClose?: () => void;
};

export function ToastMessage({
  id,
  title,
  description,
  action = "success",
  onClose,
}: Props) {
  return (
    <Toast
      nativeID={`toast-${id}`}
      bgColor={action === "error" ? "$red500" : "$green500"}
      mt="$10"
    >
      <VStack space="xs">
        {onClose && (
          <Pressable alignSelf="flex-end" onPress={onClose}>
            <Icon as={X} color="$coolGray50" size="md" />
          </Pressable>
        )}

        <ToastTitle color="$white" fontFamily="$bold" fontSize="$sm">
          {title}
        </ToastTitle>

        {description && (
          <ToastDescription color="$white" fontFamily="$body">
            {description}
          </ToastDescription>
        )}
      </VStack>
    </Toast>
  );
}

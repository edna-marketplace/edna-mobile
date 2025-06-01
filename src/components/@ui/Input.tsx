import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Input as GluestackInput,
  InputField,
  Text,
} from "@gluestack-ui/themed";
import { Icon } from "phosphor-react-native";
import { ComponentProps } from "react";
import { gluestackUIConfig } from "../../../config/gluestack-ui.config";

type Props = ComponentProps<typeof InputField> & {
  label?: string;
  icon?: Icon;
  errorMessage?: string | null;
  isInvalid?: boolean;
  isReadOnly?: boolean;
};

export function Input({
  label,
  icon: IconComponent,
  isReadOnly,
  errorMessage = null,
  isInvalid = false,
  ...rest
}: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} w="$full">
      {label && (
        <Text size="md" fontWeight="$bold" marginBottom="$2" color="$base400">
          {label}
        </Text>
      )}
      <GluestackInput
        isInvalid={invalid}
        h="$12"
        px={IconComponent ? "$4" : "$2"}
        gap="$1"
        bg="$base600"
        borderWidth="$1"
        borderColor="$base500"
        rounded="$lg"
        alignItems="center"
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? "$red500" : "$base400",
        }}
        $invalid={{
          borderWidth: 1,
          borderColor: "$red500",
        }}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
      >
        {IconComponent && (
          <IconComponent color={theme.base400} weight={"bold"} />
        )}
        <InputField
          color="$black"
          fontFamily="$body"
          placeholderTextColor="$base400"
          {...rest}
        />
      </GluestackInput>

      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}

import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Input as GluestackInput,
  InputField,
  Text,
  Pressable,
} from "@gluestack-ui/themed";
import { Icon } from "phosphor-react-native";
import Eye from "phosphor-react-native/src/icons/Eye";
import EyeSlash from "phosphor-react-native/src/icons/EyeSlash";
import { ComponentProps, useState } from "react";
import { gluestackUIConfig } from "../../../config/gluestack-ui.config";

type Props = ComponentProps<typeof InputField> & {
  label?: string;
  errorMessage?: string | null;
  isInvalid?: boolean;
};

export function PasswordInput({
  label,
  errorMessage = null,
  isInvalid = false,
  secureTextEntry,
  ...rest
}: Props) {
  const theme = gluestackUIConfig.tokens.colors;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const invalid = !!errorMessage || isInvalid;
  const isPassword = secureTextEntry;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <FormControl isInvalid={invalid} w="$full">
      {label && (
        <Text size="md" fontWeight="$bold" marginBottom="$2" color="$base200">
          {label}
        </Text>
      )}
      <GluestackInput
        isInvalid={invalid}
        h="$12"
        px="$2"
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
      >
        <InputField
          color="$black"
          fontFamily="$body"
          placeholderTextColor="$base400"
          secureTextEntry={isPassword && !isPasswordVisible}
          {...rest}
        />
        {isPassword && (
          <Pressable onPress={togglePasswordVisibility}>
            {!isPasswordVisible ? (
              <EyeSlash color={theme.base400} />
            ) : (
              <Eye color={theme.base400} />
            )}
          </Pressable>
        )}
      </GluestackInput>

      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}

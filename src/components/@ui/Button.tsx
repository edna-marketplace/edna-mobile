import { ComponentProps, ReactNode } from "react";

import {
  ButtonSpinner,
  Button as GluestackButton,
  Text,
} from "@gluestack-ui/themed";

import { Icon } from "phosphor-react-native";
import { gluestackUIConfig } from "../../../config/gluestack-ui.config";

type Props = ComponentProps<typeof GluestackButton> & {
  title: string;
  variantStyle?: "primary" | "secondary" | "tertiary";
  isLoading?: boolean;
  isDisabled?: boolean;
  children?: ReactNode;
  icon?: Icon;
  iconWeight?: "bold" | "duotone" | "fill" | "light" | "regular" | "thin";
};

export function Button({
  title,
  variantStyle = "primary",
  isLoading = false,
  isDisabled = false,
  icon: IconComponent,
  iconWeight = "regular",
  disabled,
  ...rest
}: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  return (
    <GluestackButton
      w="$full"
      h="$14"
      gap="$2"
      bg={
        variantStyle === "primary"
          ? "$base100"
          : variantStyle === "secondary"
          ? "$base500"
          : "transparent"
      }
      rounded="$lg"
      $active-bg={
        variantStyle === "primary"
          ? "$base100"
          : variantStyle === "secondary"
          ? "$base500"
          : "transparent"
      }
      disabled={isLoading || isDisabled}
      opacity={isDisabled || isLoading ? 0.6 : 1}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner
          color={variantStyle === "primary" ? "$white" : "$base100"}
        />
      ) : (
        <>
          {IconComponent && (
            <IconComponent
              color={variantStyle === "primary" ? theme.white : theme.base100}
              weight={iconWeight}
            />
          )}
          <Text
            color={variantStyle === "primary" ? "$white" : "$base100"}
            fontFamily="$heading"
            fontWeight="$bold"
          >
            {title}
          </Text>
        </>
      )}
    </GluestackButton>
  );
}

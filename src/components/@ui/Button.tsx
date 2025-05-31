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
  children?: ReactNode;
  icon?: Icon;
};

export function Button({
  title,
  variantStyle = "primary",
  isLoading = false,
  icon: IconComponent,
  ...rest
}: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  return (
    <GluestackButton
      w="$full"
      h="$14"
      gap="$1"
      bg={
        variantStyle === "primary"
          ? "$base100"
          : variantStyle === "secondary"
          ? "$base500"
          : "transparent"
      }
      rounded="$sm"
      $active-bg={
        variantStyle === "primary"
          ? "$base100"
          : variantStyle === "secondary"
          ? "$base500"
          : "transparent"
      }
      disabled={isLoading}
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
              weight={variantStyle === "tertiary" ? "bold" : "regular"}
            />
          )}
          <Text
            color={variantStyle === "primary" ? "$white" : "$base100"}
            fontFamily="$heading"
            fontSize="$sm"
            fontWeight={variantStyle === "tertiary" ? "$bold" : "$regular"}
          >
            {title}
          </Text>
        </>
      )}
    </GluestackButton>
  );
}

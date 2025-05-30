import { ComponentProps } from "react";

import {
  ButtonSpinner,
  Button as GluestackButton,
  Text,
} from "@gluestack-ui/themed";

type Props = ComponentProps<typeof GluestackButton> & {
  title: string;
  variantStyle?: "primary" | "secondary" | "tertiary";
  isLoading?: boolean;
};

export function Button({
  title,
  variantStyle = "primary",
  isLoading = false,
  ...rest
}: Props) {
  return (
    <GluestackButton
      w="$full"
      h="$14"
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
        <ButtonSpinner />
      ) : (
        <Text
          color={variantStyle === "primary" ? "$white" : "$base100"}
          fontFamily="$heading"
          fontSize="$sm"
          fontWeight={variantStyle === "tertiary" ? "$bold" : "$regular"}
        >
          {title}
        </Text>
      )}
    </GluestackButton>
  );
}

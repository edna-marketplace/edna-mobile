import { Box } from "@gluestack-ui/themed";
import { ComponentProps, ReactNode } from "react";

type Props = ComponentProps<typeof Box> & {
  children: ReactNode;
};

export function Card({ children, ...rest }: Props) {
  return (
    <Box
      w="$full"
      flexDirection="row"
      gap="$4"
      p="$4"
      bg="$base600"
      borderWidth={1}
      borderColor="$base500"
      rounded="$lg"
      {...rest}
    >
      {children}
    </Box>
  );
}

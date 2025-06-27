import { CategoryDTO } from "@/dtos/CategoryDTO";
import { Image, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Pressable> & {
  category: CategoryDTO;
  size?: "sm" | "md";
};

export function CategoryCard({ category, size = "md", ...rest }: Props) {
  return (
    <Pressable {...rest}>
      <VStack
        w={size === "sm" ? 145 : 165}
        h={size === "sm" ? 135 : 155}
        mb="$3"
        bg={category.bgColor}
        p="$4"
        rounded={size === "sm" ? "$xl" : "$2xl"}
        position="relative"
        overflow="hidden"
      >
        <Text fontWeight="$bold" fontSize="$xl" color="$white">
          {category.displayName}
        </Text>
        <Image
          source={category.image}
          alt=""
          position="absolute"
          right={0}
          bottom={0}
          w={size === "sm" ? 90 : 128}
          h={size === "sm" ? 90 : 128}
        />
      </VStack>
    </Pressable>
  );
}

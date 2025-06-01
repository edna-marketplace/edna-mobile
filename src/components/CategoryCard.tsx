import { CategoryDTO } from "@/dtos/CategoryDTO";
import { Image, Text, VStack } from "@gluestack-ui/themed";
import { ComponentProps } from "react";
import { TouchableWithoutFeedback } from "react-native";

type Props = ComponentProps<typeof TouchableWithoutFeedback> & {
  category: CategoryDTO;
};

export function CategoryCard({ category, ...rest }: Props) {
  return (
    <TouchableWithoutFeedback {...rest}>
      <VStack
        w="48%"
        h={165}
        mb="$3"
        bg={category.bgColor}
        p="$4"
        rounded="$2xl"
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
          w="$32"
          h="$32"
        />
      </VStack>
    </TouchableWithoutFeedback>
  );
}

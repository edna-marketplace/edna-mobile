import { Category } from "@/screens/ClotheCategories";
import { Image, Text, VStack } from "@gluestack-ui/themed";
import { ComponentProps } from "react";
import { TouchableWithoutFeedback } from "react-native";

type Props = ComponentProps<typeof TouchableWithoutFeedback> & {
  category: Category;
};

export function CategoryCard({ category }: Props) {
  return (
    <TouchableWithoutFeedback>
      <VStack
        w={175}
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

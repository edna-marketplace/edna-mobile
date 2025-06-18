import { HStack, Pressable } from "@gluestack-ui/themed";
import Star from "phosphor-react-native/src/icons/Star";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export function RatingStars({ rating, onRatingChange }: StarRatingProps) {
  const theme = gluestackUIConfig.tokens.colors;

  return (
    <HStack gap="$4" justifyContent="center">
      {Array.from({ length: 5 }, (_, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => onRatingChange(index + 1)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Star
              size={40}
              color={index + 1 <= rating ? theme.orangeDark : theme.base500}
              weight={"fill"}
            />
          </Pressable>
        );
      })}
    </HStack>
  );
}

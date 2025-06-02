import { Icon } from "phosphor-react-native";
import CaretRight from "phosphor-react-native/src/icons/CaretRight";
import { Card } from "./@ui/Card";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Pressable, Text, VStack } from "@gluestack-ui/themed";
import { ComponentProps } from "react";
import { LinearGradient } from "expo-linear-gradient";

type Props = ComponentProps<typeof Pressable> & {
  title: string;
  description?: string;
  icon?: Icon;
  isSelected?: boolean;
  hasForwardButton?: boolean;
};

export function SelectCard({
  title,
  description,
  icon: IconComponent,
  isSelected = false,
  hasForwardButton = false,
  ...rest
}: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  return (
    <Pressable {...rest}>
      <LinearGradient
        colors={
          isSelected
            ? [theme.blueDark, theme.orangeDark, theme.redDark]
            : [theme.base700, theme.base700]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          borderRadius: 10,
          paddingVertical: 2,
          paddingHorizontal: 2,
        }}
      >
        <Card
          alignItems="center"
          rounded="$lg"
          px="$6"
          gap="$6"
          bg={isSelected ? "$base500" : "$base600"}
        >
          {IconComponent && (
            <IconComponent size={30} color={theme.base200} weight="bold" />
          )}

          <VStack>
            <Text fontFamily="$title" color="$base200" size="lg">
              {title}
            </Text>

            <Text fontFamily="$default" fontSize="$sm" color="$base200">
              {description}
            </Text>
          </VStack>

          {hasForwardButton && (
            <Pressable marginLeft="auto">
              <CaretRight color={theme.base100} />
            </Pressable>
          )}
        </Card>
      </LinearGradient>
    </Pressable>
  );
}

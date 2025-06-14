import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";

type Props = {
  display: "showcase" | "details";
  onSwitch: (value: string) => void;
};

export function SwitchShowcaseDetails({ display, onSwitch }: Props) {
  function handleShowcase() {
    onSwitch("showcase");
  }

  function handleDetails() {
    onSwitch("details");
  }

  return (
    <HStack
      w="$full"
      pb="$6"
      px="$2"
      gap="$16"
      justifyContent="space-between"
      alignItems="center"
    >
      <Pressable onPress={handleShowcase}>
        <Text
          fontFamily="$specialTitle"
          fontSize={display === "showcase" ? "$2xl" : "$xl"}
          color={display === "showcase" ? "$base100" : "$base400"}
        >
          Vitrine
        </Text>
      </Pressable>

      <Pressable onPress={handleDetails}>
        <Text
          fontFamily="$specialTitle"
          fontSize={display === "details" ? "$2xl" : "$xl"}
          color={display === "details" ? "$base100" : "$base300"}
        >
          Informações
        </Text>
      </Pressable>
    </HStack>
  );
}

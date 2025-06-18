import { Box, Pressable, Text, VStack } from "@gluestack-ui/themed";
import React, { useState } from "react";

import { Drawer } from "./@ui/Drawer";

import {
  TargetCustomer,
  toTargetCustomerDisplay,
} from "@/utils/toTargetCustomerDisplay";
import CaretDown from "phosphor-react-native/src/icons/CaretDown";
import { FlatList } from "react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Card } from "./@ui/Card";

const ANIMATION_DURATION = 300;

const stylePreferences: TargetCustomer[] = ["MALE", "FEMALE", "ALL"];

type Props = {
  currentStyle: TargetCustomer;
  onStyleChange: (style: TargetCustomer) => void;
};

export function CustomerStyleDrawer({ currentStyle, onStyleChange }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  function handleChangeStyle(style: TargetCustomer) {
    onStyleChange(style);

    closeDrawer();
  }

  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
  }

  const triggerDisplayName = toTargetCustomerDisplay(currentStyle);

  return (
    <Box bg="transparent">
      <Pressable onPress={toggleDrawer}>
        <Card justifyContent="space-between">
          <Text>{triggerDisplayName}</Text>

          <CaretDown />
        </Card>
      </Pressable>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        animationDuration={ANIMATION_DURATION}
      >
        <VStack flex={1} p="$6" space="sm">
          <VStack justifyContent="center" alignItems="center" gap="$5" mb="$4">
            <Box w="$12" h="$1" bg="$base400" rounded="$full" />
            <Text fontSize="$lg" color="$base100" fontFamily="$title">
              Preferência de estilo
            </Text>
          </VStack>

          <FlatList
            data={stylePreferences}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Pressable
                p="$4"
                alignItems="center"
                bg={currentStyle === item ? "$base100" : "$base600"}
                borderWidth={currentStyle === item ? 0 : 1}
                borderColor={currentStyle === item ? "transparent" : "$base500"}
                rounded="$lg"
                mb="$3"
                onPress={() => handleChangeStyle(item)}
              >
                <Text
                  fontFamily={"$default"}
                  color={currentStyle === item ? "$base700" : "$black"}
                >
                  {toTargetCustomerDisplay(item)}
                </Text>
              </Pressable>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 32 }}
          />
        </VStack>
      </Drawer>
    </Box>
  );
}

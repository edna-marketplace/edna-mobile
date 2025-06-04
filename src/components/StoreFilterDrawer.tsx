import { Box, Pressable, Text, VStack } from "@gluestack-ui/themed";
import React, { useState } from "react";

import { Drawer } from "./@ui/Drawer";

import CaretDown from "phosphor-react-native/src/icons/CaretDown";
import { FlatList } from "react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { useClothes } from "@/hooks/useClothes";
import { useStores } from "@/hooks/useStores";

type Filter = {
  displayName: string;
  value: string;
};

type Props = {
  displayName: string;
  filterType: string;
  filters: Filter[];
};

const ANIMATION_DURATION = 300;

export function StoreFilterDrawer({ displayName, filterType, filters }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const theme = gluestackUIConfig.tokens.colors;

  const { getFilterValue, setFilterValue } = useStores();

  const currentValue = getFilterValue(filterType);

  function handleSetValue(value: string) {
    closeDrawer();
    setTimeout(() => setFilterValue(filterType, value), ANIMATION_DURATION);
  }

  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
  }

  const isCurrentValueAll = currentValue === "ALL";

  const triggerDisplayValue = isCurrentValueAll
    ? displayName
    : filters.find((f) => f.value === currentValue)?.displayName ?? "";

  return (
    <Box bg="transparent">
      <Pressable
        flexDirection="row"
        alignItems="center"
        gap="$1"
        marginRight="$2"
        px="$3"
        py="$2"
        bg={isCurrentValueAll ? "$base600" : "$base100"}
        borderWidth={1}
        borderColor={isCurrentValueAll ? "$base500" : "transparent"}
        rounded="$lg"
        onPress={toggleDrawer}
      >
        <Text
          size="sm"
          color={isCurrentValueAll ? "$base200" : "$base700"}
          fontFamily="$default"
        >
          {triggerDisplayValue}
        </Text>
        <CaretDown
          size={16}
          color={isCurrentValueAll ? theme.base200 : theme.base700}
        />
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
              {displayName}
            </Text>
          </VStack>

          <FlatList
            data={filters}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Pressable
                p="$4"
                alignItems="center"
                bg={currentValue === item.value ? "$base100" : "$base600"}
                borderWidth={currentValue === item.value ? 0 : 1}
                borderColor={
                  currentValue === item.value ? "transparent" : "$base500"
                }
                rounded="$lg"
                mb="$3"
                onPress={() => handleSetValue(item.value)}
              >
                <Text
                  fontFamily={"$default"}
                  color={currentValue === item.value ? "$base700" : "$black"}
                >
                  {item.displayName}
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

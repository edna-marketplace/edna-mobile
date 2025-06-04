import { Pressable, Text } from "@gluestack-ui/themed";
import { FlatList } from "react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { ClotheFilterDrawer } from "./ClotheFilterDrawer";

type Props = {
  filters: ArrayLike<any> | null | undefined;
};

export function ClotheFiltersFlatList({ filters }: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  return (
    <FlatList
      data={filters}
      keyExtractor={(item) => item.filter}
      renderItem={({ item }) => (
        <ClotheFilterDrawer
          displayName={item.displayName}
          filterType={item.filter}
          filters={item.options}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 24 }}
    />
  );
}

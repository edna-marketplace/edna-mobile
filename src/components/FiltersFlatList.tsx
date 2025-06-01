import { Pressable, Text } from "@gluestack-ui/themed";
import CaretDown from "phosphor-react-native/src/icons/CaretDown";
import { FlatList } from "react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { FilterDrawer } from "./FilterDrawer";

type Props = {
  filters: ArrayLike<any> | null | undefined;
};

export function FiltersFlatList({ filters }: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  return (
    <FlatList
      data={filters}
      keyExtractor={(item) => item.filter}
      renderItem={({ item }) => (
        <FilterDrawer
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

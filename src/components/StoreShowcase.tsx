import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import { Center, HStack, VStack } from "@gluestack-ui/themed";
import { ClotheSummary } from "./ClotheSummary";
import { EmptyList } from "./EmptyList";
import { Button } from "./@ui/Button";
import TShirt from "phosphor-react-native/src/icons/TShirt";

type Props = {
  clothes: ClotheSummaryDTO[];
  onViewMoreClothes: () => void;
};

export function StoreShowcase({ clothes, onViewMoreClothes }: Props) {
  return (
    <VStack mb="$6" gap="$4">
      <HStack flexWrap="wrap" justifyContent="space-between">
        {clothes.map((item) => (
          <ClotheSummary key={item.id} clothe={item} />
        ))}
      </HStack>
      {clothes.length === 0 && (
        <Center mt="$7">
          <EmptyList
            title="Nenhuma peça encontrada!"
            subtitle="Esse brechó não possui nenhuma peça à venda no momento."
          />
        </Center>
      )}
      <Button
        onPress={onViewMoreClothes}
        title="Ver mais"
        icon={TShirt}
        variantStyle="secondary"
      />
    </VStack>
  );
}

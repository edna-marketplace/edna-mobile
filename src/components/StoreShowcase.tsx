import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import { Center, HStack, VStack } from "@gluestack-ui/themed";
import { ClotheSummary } from "./ClotheSummary";
import { EmptyList } from "./EmptyList";

type Props = {
  clothes: ClotheSummaryDTO[];
};

export function StoreShowcase({ clothes }: Props) {
  return (
    <VStack>
      <HStack flexWrap="wrap" justifyContent="space-between" mb="$6">
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
    </VStack>
  );
}

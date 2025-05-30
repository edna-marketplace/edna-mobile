import { Button } from "@/components/@ui/Button";
import { Center } from "@gluestack-ui/themed";

export function ClotheCategories() {
  return (
    <Center flex={1} bg="$base700" px="$6" gap="$6">
      <Button title="Click" />
      <Button title="Click" variantStyle="secondary" />
      <Button title="Click" variantStyle="tertiary" />
    </Center>
  );
}

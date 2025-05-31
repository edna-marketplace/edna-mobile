import { Button } from "@/components/@ui/Button";
import { Center } from "@gluestack-ui/themed";
import BookmarkSimple from "phosphor-react-native/src/icons/BookmarkSimple";

export function ClotheCategories() {
  return (
    <Center flex={1} bg="$base700" px="$6" gap="$6">
      <Button title="Click" icon={BookmarkSimple} />
      <Button title="Click" variantStyle="secondary" icon={BookmarkSimple} />
      <Button title="Click" variantStyle="tertiary" icon={BookmarkSimple} />
    </Center>
  );
}

import { Button } from "@/components/@ui/Button";
import { Input } from "@/components/@ui/Input";
import { Center } from "@gluestack-ui/themed";
import BookmarkSimple from "phosphor-react-native/src/icons/BookmarkSimple";
import MagnifyingGlass from "phosphor-react-native/src/icons/MagnifyingGlass";

export function ClotheCategories() {
  return (
    <Center flex={1} bg="$base700" px="$6" gap="$6">
      <Input placeholder="Name" icon={MagnifyingGlass} />
      <Input placeholder="Name" />
      <Button title="Click" icon={BookmarkSimple} />
    </Center>
  );
}

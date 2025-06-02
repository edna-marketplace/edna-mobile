import { Button } from "@/components/@ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { Center, Text } from "@gluestack-ui/themed";

export interface HomeProps {}

export function Home(props: HomeProps) {
  const { signOut } = useAuth();

  return (
    <Center flex={1} bg="$base70">
      <Text fontFamily="$specialTitle" fontSize="$3xl">
        Home
      </Text>
      <Button title="SignOut" onPress={async () => signOut()} />
    </Center>
  );
}

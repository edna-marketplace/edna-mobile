import { Center, Text } from "@gluestack-ui/themed";

export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <Center flex={1} bg="$base70">
      <Text fontFamily="$specialTitle" fontSize="$3xl">
        Home
      </Text>
    </Center>
  );
}

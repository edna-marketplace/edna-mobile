import { Center, Text } from "@gluestack-ui/themed";

export interface ProfileProps {}

export function Profile(props: ProfileProps) {
  return (
    <Center flex={1} bg="$base70">
      <Text fontFamily="$specialTitle" fontSize="$3xl">
        Profile
      </Text>
    </Center>
  );
}

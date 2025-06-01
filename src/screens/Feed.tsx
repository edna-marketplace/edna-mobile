import { Center, Text } from "@gluestack-ui/themed";

export interface FeedProps {}

export function Feed(props: FeedProps) {
  return (
    <Center flex={1} bg="$base70">
      <Text fontFamily="$specialTitle" fontSize="$3xl">
        Feed
      </Text>
    </Center>
  );
}

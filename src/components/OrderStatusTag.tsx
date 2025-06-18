import { orderStatusMapper } from "@/utils/orderStatusMapper";
import { Box, Text } from "@gluestack-ui/themed";

type Props = {
  orderStatus: "PENDING" | "AWAITING_WITHDRAWAL" | "COMPLETED" | "CANCELED";
};

export function OrderStatusTag({ orderStatus }: Props) {
  const orderStatusDisplay = orderStatusMapper[orderStatus];

  function getColor(): { bg: string; text: string } {
    if (orderStatus === "PENDING") {
      return { bg: "$yellow100", text: "$yellow600" };
    }

    if (orderStatus === "AWAITING_WITHDRAWAL") {
      return { bg: "$lightBlue100", text: "$lightBlue600" };
    }

    if (orderStatus === "COMPLETED") {
      return { bg: "$green100", text: "$green600" };
    }

    if (orderStatus === "CANCELED") {
      return { bg: "$red100", text: "$red600" };
    }

    return { bg: "$base500", text: "$base300" };
  }

  const colors = getColor();

  return (
    <Box
      px="$2"
      pt="$1"
      pb="$0.5"
      bg={colors.bg}
      borderWidth={1}
      borderColor="$base500"
      rounded="$full"
    >
      <Text fontFamily="$title" fontSize="$xs" color={colors.text}>
        {orderStatusDisplay.toUpperCase()}
      </Text>
    </Box>
  );
}

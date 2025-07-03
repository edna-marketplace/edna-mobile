import { Box, HStack, Pressable, Text } from "@gluestack-ui/themed";
import CaretDoubleLeft from "phosphor-react-native/src/icons/CaretDoubleLeft";
import CaretDoubleRight from "phosphor-react-native/src/icons/CaretDoubleRight";
import CaretLeft from "phosphor-react-native/src/icons/CaretLeft";
import CaretRight from "phosphor-react-native/src/icons/CaretRight";

export interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  onPageChange: (pageIndex: number) => Promise<void> | void;
}

export function Pagination({
  pageIndex,
  perPage,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <HStack
      w="$full"
      justifyContent="space-between"
      alignItems="center"
      py="$2"
    >
      <Text fontSize="$sm" fontWeight="$bold" color="$base200">
        Página {pageIndex} de {pages}
      </Text>

      <HStack alignItems="center" gap="$3">
        <HStack alignItems="center" gap="$1">
          <Pressable
            bg="$base500"
            rounded="$sm"
            p="$2"
            onPress={() => onPageChange(1)}
            disabled={pageIndex === 1}
            opacity={pageIndex === 1 ? 0.5 : 1}
          >
            <CaretDoubleLeft size={16} />
          </Pressable>

          <Pressable
            bg="$base500"
            rounded="$sm"
            p="$2"
            onPress={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 1}
            opacity={pageIndex === 1 ? 0.5 : 1}
          >
            <CaretLeft size={16} />
          </Pressable>

          <Pressable
            bg="$base500"
            rounded="$sm"
            p="$2"
            onPress={() => onPageChange(pageIndex + 1)}
            disabled={pages <= pageIndex}
            opacity={pages <= pageIndex ? 0.5 : 1}
          >
            <CaretRight size={16} />
          </Pressable>

          <Pressable
            bg="$base500"
            rounded="$sm"
            p="$2"
            onPress={() => onPageChange(pages)}
            disabled={pages <= pageIndex}
            opacity={pages <= pageIndex ? 0.5 : 1}
          >
            <CaretDoubleRight size={16} />
          </Pressable>
        </HStack>
      </HStack>
    </HStack>
  );
}

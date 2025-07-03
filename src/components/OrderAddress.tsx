import { StoreAddress } from "@/dtos/StoreDetailsDTO";
import { HStack, Text, VStack } from "@gluestack-ui/themed";

import MapPin from "phosphor-react-native/src/icons/MapPin";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

type Props = {
  address: StoreAddress;
};

export function OrderAddress({ address }: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  return (
    <VStack>
      <HStack gap="$2">
        <MapPin weight="fill" size={30} color={theme.base300} />

        <VStack>
          <Text fontFamily="$default" color="$base300">
            {address.street}, {address.number}
          </Text>

          <Text fontFamily="$default" color="$base300">
            {address.neighborhood}, {address.city}
          </Text>

          <Text fontFamily="$title" color="$base300">
            CEP:{" "}
            <Text fontFamily="$default" color="$base300">
              {address.cep.slice(0, 5)}-{address.cep.slice(5, 8)}
            </Text>
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
}

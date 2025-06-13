import { HStack, Text, VStack } from "@gluestack-ui/themed";
import MapPin from "phosphor-react-native/src/icons/MapPin";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

type Props = {
  store: any;
};

export function StoreInfo({ store }: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  const address = {
    number: "350",
    cep: "88010000",
    street: "Rua Felipe Schmidt",
    neighborhood: "Centro",
    city: "Florianópolis",
  };

  return (
    <VStack flex={1} gap="$6" pb="$8">
      <VStack gap="$1">
        <Text fontFamily="$title" fontSize="$xl" color="$base200">
          Descrição do brechó
        </Text>

        <Text fontFamily="$default" color="$base300">
          descricao teste
        </Text>
      </VStack>

      <VStack gap="$1">
        <Text fontFamily="$title" fontSize="$xl" color="$base200">
          Horário de atendimento
        </Text>

        <HStack justifyContent="space-between">
          <Text fontFamily="$default" color="$base300">
            Segunda-feira
          </Text>
          <Text mr="$20" fontFamily="$title" color="$base300">
            8:00 - 18:00
          </Text>
        </HStack>

        <HStack justifyContent="space-between">
          <Text fontFamily="$default" color="$base300">
            Terça-feira
          </Text>
          <Text mr="$20" fontFamily="$title" color="$base300">
            8:00 - 18:00
          </Text>
        </HStack>

        <HStack justifyContent="space-between">
          <Text fontFamily="$default" color="$base300">
            Quarta-feira
          </Text>
          <Text mr="$20" fontFamily="$title" color="$base300">
            8:00 - 18:00
          </Text>
        </HStack>

        <HStack justifyContent="space-between">
          <Text fontFamily="$default" color="$base300">
            Quinta-feira
          </Text>
          <Text mr="$20" fontFamily="$title" color="$base300">
            8:00 - 18:00
          </Text>
        </HStack>

        <HStack justifyContent="space-between">
          <Text fontFamily="$default" color="$base300">
            Sexta-feira
          </Text>
          <Text mr="$20" fontFamily="$title" color="$base300">
            8:00 - 18:00
          </Text>
        </HStack>

        <HStack justifyContent="space-between">
          <Text fontFamily="$default" color="$base300">
            Sábado
          </Text>
          <Text mr="$20" fontFamily="$title" color="$base300">
            FECHADO
          </Text>
        </HStack>

        <HStack justifyContent="space-between">
          <Text fontFamily="$default" color="$base300">
            Domingo-feira
          </Text>
          <Text mr="$20" fontFamily="$title" color="$base300">
            FECHADO
          </Text>
        </HStack>
      </VStack>

      <VStack gap="$1">
        <Text fontFamily="$title" fontSize="$xl" color="$base200">
          Endereço
        </Text>

        <HStack gap="$3">
          <MapPin weight="fill" size={40} color={theme.base300} />

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

      <VStack gap="$1">
        <Text fontFamily="$title" fontSize="$xl" color="$base200">
          Outras informações
        </Text>

        <Text fontFamily="$title" color="$base300">
          Contato:{" "}
          <Text fontFamily="$default" color="$base300">
            (48) 9 9123-4567
          </Text>
        </Text>

        <Text fontFamily="$title" color="$base300">
          CNPJ:{" "}
          <Text fontFamily="$default" color="$base300">
            12.345.678/0001-23
          </Text>
        </Text>
      </VStack>
    </VStack>
  );
}

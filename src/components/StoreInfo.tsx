import { HStack, Text, VStack } from "@gluestack-ui/themed";
import MapPin from "phosphor-react-native/src/icons/MapPin";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { StoreDetailsDTO } from "@/dtos/StoreDetailsDTO";
import { FlatList } from "react-native";
import { weekDayMapper } from "@/utils/weekDayMapper";
import { convertTimeInMinutesToString } from "@/utils/convertTimeInMinutesToString";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { formatCNPJ } from "@/utils/formatCNPJ";

type Props = {
  store: StoreDetailsDTO;
};

export function StoreInfo({ store }: Props) {
  const theme = gluestackUIConfig.tokens.colors;

  return (
    <VStack flex={1} gap="$6" pb="$8">
      <VStack gap="$1">
        <Text fontFamily="$title" fontSize="$xl" color="$base200">
          Descrição do brechó
        </Text>

        {store.description ? (
          <Text fontFamily="$default" color="$base300">
            {store.description}
          </Text>
        ) : (
          <Text fontFamily="$default" color="$base300" my="$4">
            Sem descrição.
          </Text>
        )}
      </VStack>

      <VStack gap="$1">
        <Text fontFamily="$title" fontSize="$xl" color="$base200">
          Horário de atendimento
        </Text>

        {store.schedule.map((day) => (
          <HStack key={day.id} justifyContent="space-between">
            <Text fontFamily="$default" color="$base300">
              {weekDayMapper[day.dayOfWeek]}
            </Text>
            {day.enabled ? (
              <Text mr="$20" fontFamily="$title" color="$base300">
                {convertTimeInMinutesToString(day.openingTimeInMinutes)} -{" "}
                {convertTimeInMinutesToString(day.closingTimeInMinutes)}
              </Text>
            ) : (
              <Text mr="$20" fontFamily="$title" color="$base300">
                FECHADO
              </Text>
            )}
          </HStack>
        ))}
      </VStack>

      <VStack gap="$1">
        <Text fontFamily="$title" fontSize="$xl" color="$base200">
          Endereço
        </Text>

        <HStack gap="$3">
          <MapPin weight="fill" size={40} color={theme.base300} />

          <VStack>
            <Text fontFamily="$default" color="$base300">
              {store.address.street}, {store.address.number}
            </Text>

            <Text fontFamily="$default" color="$base300">
              {store.address.neighborhood}, {store.address.city}
            </Text>

            <Text fontFamily="$title" color="$base300">
              CEP:{" "}
              <Text fontFamily="$default" color="$base300">
                {store.address.cep.slice(0, 5)}-{store.address.cep.slice(5, 8)}
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
            {formatPhoneNumber(store.phone)}
          </Text>
        </Text>

        <Text fontFamily="$title" color="$base300">
          CNPJ:{" "}
          <Text fontFamily="$default" color="$base300">
            {formatCNPJ(store.cnpj)}
          </Text>
        </Text>
      </VStack>
    </VStack>
  );
}

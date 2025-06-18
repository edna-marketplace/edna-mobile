import { Button } from "@/components/@ui/Button";
import { Header } from "@/components/@ui/Header";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { Center, Text, VStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import ArrowRight from "phosphor-react-native/src/icons/ArrowRight";

export function CompletedPurchase() {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigate("home");
  }

  function handleOrders() {
    navigate("orders");
  }

  return (
    <VStack flex={1} pt="$14">
      <Header title="Compra" onGoBack={handleGoBack} />

      <Center flex={1} gap="$2" px="$8">
        <Text
          textAlign="center"
          fontFamily="$specialTitle"
          fontSize="$3xl"
          color="$base100"
        >
          Pedido concluído!
        </Text>

        <VStack>
          <Text textAlign="center" fontFamily="$default" color="$base200">
            Agora é só esperar o brechó confimar!
          </Text>
          <Text textAlign="center" fontFamily="$default" color="$base200">
            Você pode ver o status na tela de Pedidos.
          </Text>
        </VStack>

        <Button
          mt="$6"
          title="Pedidos"
          icon={ArrowRight}
          onPress={handleOrders}
        />
      </Center>
    </VStack>
  );
}

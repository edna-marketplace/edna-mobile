import { StatusBar } from "react-native";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import {
  Box,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import { Button } from "@/components/@ui/Button";
import { SelectCard } from "@/components/SelectCard";

import CaretLeft from "phosphor-react-native/src/icons/CaretLeft";
import Dress from "phosphor-react-native/src/icons/Dress";
import ShirtFolded from "phosphor-react-native/src/icons/ShirtFolded";
import TShirt from "phosphor-react-native/src/icons/TShirt";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";
import { useCallback, useState } from "react";
import { SignUpFormData } from "./SignUp";
import { signUp } from "@/api/sign-up";
import { useAuth } from "@/hooks/useAuth";

type Style = "MALE" | "FEMALE" | "ALL" | undefined;

type RouteParamsProps = {
  signUpInfo: SignUpFormData;
};

export function SelectStyle() {
  const [style, setStyle] = useState<Style>(undefined);

  const { signIn } = useAuth();

  const theme = gluestackUIConfig.tokens.colors;

  const route = useRoute();
  const { signUpInfo } = route.params as RouteParamsProps;

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  function handleSelectStyle(selected: Style) {
    setStyle(selected);
  }

  async function handleSignUp() {
    try {
      await signUp({
        name: signUpInfo.name,
        email: signUpInfo.email,
        phone: signUpInfo.phone,
        cpf: signUpInfo.cpf,
        password: signUpInfo.password,
        stylePreference: style,
      });

      navigate("signIn");
    } catch (error) {
      console.error(error);
    }
  }

  function handleGoBack() {
    navigate("signUp", { signUpInfo: signUpInfo });
  }

  function handleSignIn() {
    navigate("signIn");
  }

  useFocusEffect(
    useCallback(() => {
      console.log(style);
    }, [style])
  );

  return (
    <>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack
          flex={1}
          bg="$base700"
          alignItems="center"
          pt="$16"
          pb="$6"
          px="$6"
        >
          <Box w="$full" gap="$4">
            <HStack alignItems="center" gap="$6">
              <Pressable onPress={handleGoBack} mb="$1">
                <CaretLeft size={30} color={theme.base100} />
              </Pressable>

              <Text fontFamily="$title" fontSize="$2xl">
                Qual é o seu estilo?
              </Text>
            </HStack>

            <Text fontFamily="$default" fontSize="$md" color="$base300">
              Recomendaremos peças no feed com base no seu estilo, escolha entre
              as opções abaixo.
            </Text>

            <VStack gap="$4">
              <SelectCard
                title="Moda feminina"
                description="Voltado para a moda feminina"
                icon={Dress}
                isSelected={style === "FEMALE"}
                onPress={() => handleSelectStyle("FEMALE")}
              />
              <SelectCard
                title="Moda masculina"
                description="Voltado para a moda masculina"
                icon={ShirtFolded}
                isSelected={style === "MALE"}
                onPress={() => handleSelectStyle("MALE")}
              />
              <SelectCard
                title="Todos os estilos"
                description="Moda feminina e masculina"
                icon={TShirt}
                isSelected={style === "ALL"}
                onPress={() => handleSelectStyle("ALL")}
              />

              <Button
                title={!style ? "Selecione um estilo" : "Cadastrar-se"}
                isDisabled={!style}
                mt="$4"
                onPress={handleSignUp}
              />
              <Button
                onPress={handleSignIn}
                title="Voltar para o login"
                variantStyle="secondary"
              />
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </>
  );
}

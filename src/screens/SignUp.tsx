import {
  Box,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import { Button } from "@/components/@ui/Button";
import { Input } from "@/components/@ui/Input";

import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute } from "@react-navigation/native";
import CaretLeft from "phosphor-react-native/src/icons/CaretLeft";
import { Controller, useForm } from "react-hook-form";
import { StatusBar } from "react-native";
import * as yup from "yup";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/;
const phoneRegex = /^(\(\d{2}\)\s?9\s?\d{4}-\d{4}|\d{2}9\d{8})$/;

const signUpSchema = yup.object({
  name: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .required("O e-mail é obrigatório")
    .email("O e-mail deve ser válido"),
  phone: yup
    .string()
    .required("O telefone é obrigatório")
    .matches(phoneRegex, "O telefone deve ser válido")
    .transform((value: string) => value.replace(/[(\[)\-\s+]/g, "")),
  cpf: yup
    .string()
    .required("O CPF é obrigatório")
    .matches(cpfRegex, "O CPF deve ser válido")
    .transform((value: string) => value.replace(/[.\-\s+]/g, "")),
  password: yup
    .string()
    .required("A senha é obrigatória.")
    .min(6, "A senha deve ter no mínimo 6 dígitos."),
  password_confirmation: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password")], "As senhas não conferem."),
});

export type SignUpFormData = yup.InferType<typeof signUpSchema>;

type RouteParamsProps = {
  signUpInfo?: SignUpFormData;
};

export function SignUp() {
  const theme = gluestackUIConfig.tokens.colors;

  const route = useRoute();
  const { signUpInfo } = route.params as RouteParamsProps;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: signUpInfo ? signUpInfo.name : "",
      email: signUpInfo ? signUpInfo.email : "",
      phone: signUpInfo ? signUpInfo.phone : "",
      cpf: signUpInfo ? signUpInfo.cpf : "",
      password: signUpInfo ? signUpInfo.password : "",
      password_confirmation: signUpInfo ? signUpInfo.password : "",
    },
  });

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  function handleContinue(data: SignUpFormData) {
    navigate("selectStyle", { signUpInfo: data });
  }

  function handleSignIn() {
    navigate("signIn");
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack
          flex={1}
          bg="$base700"
          alignItems="center"
          pt="$14"
          pb="$6"
          px="$6"
        >
          <Box w="$full" gap="$4">
            <HStack alignItems="center" gap="$6">
              <Pressable onPress={handleSignIn} mb="$1">
                <CaretLeft size={30} color={theme.base100} />
              </Pressable>

              <Text fontFamily="$title" fontSize="$3xl">
                Cadastro
              </Text>
            </HStack>

            <VStack gap="$4">
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={onChange}
                    value={value}
                    label="Nome"
                    placeholder="Ex: Edna da Silva"
                    errorMessage={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={onChange}
                    value={value}
                    label="E-mail"
                    placeholder="Ex: edna@email.com"
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={onChange}
                    value={value}
                    label="Telefone"
                    placeholder="Ex: (48) 9 1234-5678"
                    errorMessage={errors.phone?.message}
                    keyboardType="phone-pad"
                  />
                )}
              />

              <Controller
                name="cpf"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={onChange}
                    value={value}
                    label="CPF"
                    placeholder="Ex: 123.456.789-01"
                    errorMessage={errors.cpf?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={onChange}
                    value={value}
                    label="Senha"
                    placeholder="Sua senha"
                    secureTextEntry
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <Controller
                name="password_confirmation"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={onChange}
                    value={value}
                    label="Confirmar senha"
                    placeholder="Confirme sua senha"
                    secureTextEntry
                    errorMessage={errors.password_confirmation?.message}
                  />
                )}
              />

              <Button
                isLoading={isSubmitting}
                onPress={handleSubmit(handleContinue)}
                title="Continuar"
                mt="$4"
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

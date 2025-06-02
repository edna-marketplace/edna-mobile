import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";

import logoImg from "@/assets/logo/logo.png";
import { Input } from "@/components/@ui/Input";
import { Button } from "@/components/@ui/Button";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import CaretLeft from "phosphor-react-native/src/icons/CaretLeft";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { StatusBar } from "react-native";

const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/;
const phoneRegex = /^(\(\d{2}\)\s?9\s?\d{4}-\d{4}|\d{2}9\d{8})$/;

const signUpSchema = z
  .object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z
      .string()
      .min(1, "O e-mail é obrigatório")
      .email("O e-mail deve ser válido"),
    phone: z
      .string()
      .min(1, "O telefone é obrigatório")
      .regex(phoneRegex, "O telefone deve ser válido"),
    cpf: z
      .string()
      .min(1, "O CPF é obrigatório")
      .regex(cpfRegex, "O CPF deve ser válido"),
    password: z
      .string()
      .min(1, { message: "Senha é obrigatória" })
      .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
    password_confirm: z
      .string()
      .min(1, { message: "Confirmação de senha é obrigatória" }),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "As senhas não coincidem",
    path: ["password_confirm"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUp() {
  const theme = gluestackUIConfig.tokens.colors;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  async function handleSignUp(data: SignUpFormData) {
    console.log(data);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
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
              <Pressable mb="$1">
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
                    placeholder="Ex: Edna Moda"
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
                name="password_confirm"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={onChange}
                    value={value}
                    label="Confirmar senha"
                    placeholder="Confirme sua senha"
                    secureTextEntry
                    errorMessage={errors.password_confirm?.message}
                  />
                )}
              />

              <Button
                isLoading={isSubmitting}
                onPress={handleSubmit(handleSignUp)}
                title="Cadastrar e entrar"
                mt="$4"
              />
              <Button title="Voltar para o login" variantStyle="secondary" />
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </>
  );
}

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

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Preencha o e-mail")
    .email("O e-mail deve ser válido"),
  password: z.string().min(1, "Preencha a senha"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  async function handleSignIn(data: SignInFormData) {
    console.log(data);
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
        bg="$base700"
        alignItems="center"
        pt="$32"
        pb="$6"
        px="$6"
      >
        <Image source={logoImg} w={250} h={150} alt="" mb="$8" />

        <Box w="$full" gap="$6">
          <Text fontFamily="$title" fontSize="$3xl">
            Login
          </Text>

          <VStack gap="$4">
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={onChange}
                  value={value}
                  label="E-mail"
                  placeholder="Seu e-mail"
                  errorMessage={errors.email?.message}
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

            <Box w="$full" alignItems="flex-end">
              <Pressable>
                <Text fontFamily="$title" fontSize="$sm">
                  Esqueceu a senha?
                </Text>
              </Pressable>
            </Box>

            <Button
              isLoading={isSubmitting}
              onPress={handleSubmit(handleSignIn)}
              title="Entrar"
            />
            <Button title="Cadastrar-se" variantStyle="secondary" />
          </VStack>
        </Box>
      </VStack>
    </ScrollView>
  );
}

import {
  Box,
  Image,
  Pressable,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "@gluestack-ui/themed";

import logoImg from "@/assets/logo/logo.png";
import { Button } from "@/components/@ui/Button";
import { Input } from "@/components/@ui/Input";

import { useAuth } from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";
import { StatusBar } from "react-native";
import { AxiosError } from "axios";
import { PasswordInput } from "@/components/@ui/PasswordInput";
import { AppError } from "@/utils/AppError";
import { ToastMessage } from "@/components/ToastMessage";
import { sendOTPEmail } from "@/api/send-otp-email";

const signInSchema = yup.object({
  email: yup
    .string()
    .required("Preencha o e-mail.")
    .email("O e-mail deve ser válido."),
  password: yup.string().required("Preencha a senha."),
});

type SignInFormData = yup.InferType<typeof signInSchema>;

export function SignIn() {
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
  });

  const toast = useToast();

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  async function handleSignIn(data: SignInFormData) {
    try {
      await sendOTPEmail(data.email, data.password);

      navigate("twoFactorOtp", data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível realizar login. Tente novamente mais tarde.";

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage id={id} title={title} action="error" />
        ),
      });
    }
  }

  function handleSignUp() {
    navigate("signUp", { signUpInfo: undefined });
  }

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
                  <PasswordInput
                    onChangeText={onChange}
                    value={value}
                    label="Senha"
                    secureTextEntry
                    placeholder="Sua senha"
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <Box w="$full" alignItems="flex-end">
                <Pressable onPress={() => navigate("forgotPassword")}>
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
              <Button
                onPress={handleSignUp}
                title="Cadastrar-se"
                variantStyle="secondary"
              />
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </>
  );
}

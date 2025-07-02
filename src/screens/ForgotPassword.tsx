import {
  Box,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "@gluestack-ui/themed";

import logoImg from "@/assets/logo/logo.png";
import { Button } from "@/components/@ui/Button";
import { Input } from "@/components/@ui/Input";

import { ToastMessage } from "@/components/ToastMessage";
import { useAuth } from "@/hooks/useAuth";
import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";
import { AppError } from "@/utils/AppError";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { sendNewPasswordEmail } from "@/api/send-new-password-email";

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
});

type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;

export function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const toast = useToast();

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  async function handleForgotPassword(data: ForgotPasswordFormData) {
    try {
      await sendNewPasswordEmail(data.email);

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Um e-mail foi enviado com sua nova senha"
            action="success"
          />
        ),
      });

      navigate("signIn");
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível enviar e-mail de recupereção de senha. Tente novamente mais tarde.";

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage id={id} title={title} action="error" />
        ),
      });
    }
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
          pt="$16"
          pb="$6"
          px="$6"
        >
          <Box w="$full" gap="$6">
            <VStack>
              <Text fontFamily="$title" fontSize="$3xl">
                Recuperação de senha
              </Text>

              <Text fontFamily="$default" fontSize="$md" color="$base300">
                Após você inserir seu e-mail e clicar no botão "Enviar senha",
                enviaremos um e-mail contendo sua nova senha.
              </Text>
            </VStack>

            <VStack gap="$10">
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={onChange}
                    value={value}
                    label="Seu e-mail"
                    placeholder="E-mail"
                    errorMessage={errors.email?.message}
                  />
                )}
              />

              <VStack gap="$4">
                <Button
                  isLoading={isSubmitting}
                  onPress={handleSubmit(handleForgotPassword)}
                  title="Enviar senha"
                />

                <Button
                  onPress={() => navigate("signIn")}
                  title="Voltar para login"
                  variantStyle="secondary"
                />
              </VStack>
            </VStack>
          </Box>
        </VStack>
      </ScrollView>
    </>
  );
}

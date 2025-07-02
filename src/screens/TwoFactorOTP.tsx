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

const twoFactorOTPSchema = yup.object({
  otp: yup.string().min(6, "Preencha o código de verificação OTP").required(),
});

type TwoFactorOTPFormData = yup.InferType<typeof twoFactorOTPSchema>;

type RouteParams = {
  email: string;
  password: string;
};

export function TwoFactorOTP() {
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TwoFactorOTPFormData>({
    resolver: yupResolver(twoFactorOTPSchema),
  });

  const toast = useToast();

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

  const route = useRoute();
  const { email, password } = route.params as RouteParams;

  async function handleTwoFactorOTP(data: TwoFactorOTPFormData) {
    try {
      await signIn(email, password, data.otp);
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
            <VStack>
              <Text fontFamily="$title" fontSize="$3xl">
                Verificação de Dois Fatores
              </Text>

              <Text fontFamily="$default" fontSize="$md" color="$base300">
                Foi enviado um e-mail para você com um código OTP, por favor
                insira esse código no campo abaixo.
              </Text>
            </VStack>

            <VStack gap="$10">
              <Controller
                name="otp"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={onChange}
                    value={value}
                    label="Código OTP"
                    placeholder="OTP"
                    errorMessage={errors.otp?.message}
                  />
                )}
              />

              <VStack gap="$4">
                <Button
                  isLoading={isSubmitting}
                  onPress={handleSubmit(handleTwoFactorOTP)}
                  title="Entrar"
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

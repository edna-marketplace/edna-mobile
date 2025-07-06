import { getAuthenticatedUser } from "@/api/get-authenticated-user";
import { updateCustomer } from "@/api/update-customer-info";
import { Button } from "@/components/@ui/Button";
import { Header } from "@/components/@ui/Header";
import { Input } from "@/components/@ui/Input";
import { CustomerStyleDrawer } from "@/components/CustomerStyleDrawer";
import { Loading } from "@/components/Loading";
import { ToastMessage } from "@/components/ToastMessage";
import { UpdatePassword } from "@/components/UpdatePassword";
import { AuthenticatedUserDTO } from "@/dtos/AuthenticatedUserDTO";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { AppError } from "@/utils/AppError";
import { formatCPF } from "@/utils/formatCPF";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { TargetCustomer } from "@/utils/toTargetCustomerDisplay";
import { ScrollView, Text, useToast, VStack } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ArrowsClockwise from "phosphor-react-native/src/icons/ArrowsClockwise";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";

const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/;
const phoneRegex = /^(\(\d{2}\)\s?9\s?\d{4}-\d{4}|\d{2}9\d{8})$/;

const signUpSchema = yup.object({
  name: yup
    .string()
    .required("O nome é obrigatório")
    .max(200, "O nome deve ter no máximo 200 digitos."),
  email: yup
    .string()
    .required("O e-mail é obrigatório")
    .email("O e-mail deve ser válido")
    .max(250, "O e-mail deve ter no máximo 250 digitos."),
  cpf: yup
    .string()
    .required("O CPF é obrigatório")
    .matches(cpfRegex, "O CPF deve ser válido")
    .transform((value: string) => value.replace(/[.\-\s+]/g, "")),
  phone: yup
    .string()
    .required("O telefone é obrigatório")
    .matches(phoneRegex, "O telefone deve ser válido")
    .transform((value: string) => value.replace(/[(\[)\-\s+]/g, "")),
});

export type SignUpFormData = yup.InferType<typeof signUpSchema>;

export function ProfileDetails() {
  const [user, setUser] = useState<AuthenticatedUserDTO | null>(null);
  const [currentStyle, setCurrentStyle] = useState<TargetCustomer>("ALL");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  async function handleGoBack() {
    navigate("profile");
  }

  function handleChangeStyle(style: TargetCustomer) {
    setCurrentStyle(style);
  }

  async function getAuthenticatedUserData() {
    const data = await getAuthenticatedUser();

    setUser(data);
    setCurrentStyle(data.stylePreference);

    setValue("name", data.name);
    setValue("email", data.email);
    setValue("cpf", formatCPF(data.cpf));
    setValue("phone", formatPhoneNumber(data.phone));
  }

  const toast = useToast();

  async function handleUpdate(data: SignUpFormData) {
    try {
      await updateCustomer({
        name: data.name,
        email: data.email,
        phone: data.phone,
        cpf: data.cpf,
        stylePreference: currentStyle,
      });

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Informações atualizadas com sucesso!"
            action="success"
          />
        ),
      });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível atualizar os dados. Tente novamente mais tarde.";

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage id={id} title={title} action="error" />
        ),
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      getAuthenticatedUserData();
    }, [])
  );

  return (
    <VStack flex={1} pt="$14">
      {!user ? (
        <Loading />
      ) : (
        <>
          <Header title="Dados da conta" onGoBack={handleGoBack} />

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <VStack flex={1} px="$6" py="$8" gap="$4">
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={onChange}
                    value={value}
                    label="Nome"
                    placeholder="Seu nome"
                    maxLength={200}
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
                    placeholder="Seu e-email"
                    maxLength={250}
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
                    placeholder="Seu telefone"
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
                    placeholder="Seu CPF"
                    errorMessage={errors.cpf?.message}
                    isReadOnly
                  />
                )}
              />

              <VStack>
                <Text
                  size="md"
                  fontWeight="$bold"
                  marginBottom="$2"
                  color="$base200"
                >
                  Preferência de estilo
                </Text>

                <CustomerStyleDrawer
                  currentStyle={currentStyle}
                  onStyleChange={handleChangeStyle}
                />
              </VStack>

              <Button
                title="Atualizar informações"
                icon={ArrowsClockwise}
                iconWeight="bold"
                mt="$4"
                onPress={handleSubmit(handleUpdate)}
                isLoading={isSubmitting}
              />

              <UpdatePassword />
            </VStack>
          </ScrollView>
        </>
      )}
    </VStack>
  );
}

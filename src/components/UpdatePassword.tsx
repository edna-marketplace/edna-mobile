import { useToast, VStack } from "@gluestack-ui/themed";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./@ui/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePassword } from "@/api/update-password";
import ArrowsClockwise from "phosphor-react-native/src/icons/ArrowsClockwise";
import { Button } from "./@ui/Button";
import { AppError } from "@/utils/AppError";
import { ToastMessage } from "./ToastMessage";

export const UpdatePasswordSchema = yup
  .object({
    oldPassword: yup
      .string()
      .min(6, "A senha tem no mínimo 6 caracteres")
      .required(),
    newPassword: yup
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required(),
  })
  .test(
    "passwords-different",
    "A nova senha deve ser diferente da antiga",
    function (value) {
      return value.oldPassword !== value.newPassword;
    }
  );

export type UpdatePasswordData = yup.InferType<typeof UpdatePasswordSchema>;

export function UpdatePassword() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordData>({
    resolver: yupResolver(UpdatePasswordSchema),
  });

  const toast = useToast();

  async function handleUpdatePassword(data: UpdatePasswordData) {
    try {
      await updatePassword(data);

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Senha atualizada com sucesso!"
            action="success"
          />
        ),
      });

      reset();
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível atualizar a senha. Tente novamente mais tarde.";

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage id={id} title={title} action="error" />
        ),
      });
    }
  }

  return (
    <VStack flex={1} py="$6" gap="$6" borderTopWidth={1} borderColor="$base500">
      <Controller
        name="oldPassword"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            label="Senha antiga"
            placeholder="Sua senha antiga"
            errorMessage={errors.oldPassword?.message}
          />
        )}
      />

      <Controller
        name="oldPassword"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            label="Senha antiga"
            placeholder="Sua senha antiga"
            errorMessage={errors.oldPassword?.message}
          />
        )}
      />

      <Button
        title="Atualizar senha"
        icon={ArrowsClockwise}
        iconWeight="bold"
        mt="$4"
        onPress={handleSubmit(handleUpdatePassword)}
        isLoading={isSubmitting}
      />
    </VStack>
  );
}

import { Input } from "@/components/@ui/Input";
import { Center } from "@gluestack-ui/themed";

export function ClotheCategories() {
  return (
    <Center flex={1} bg="$base700" px="$6" gap="$6">
      <Input
        label="Nome"
        placeholder="Seu nome"
        errorMessage="Nome é obrigatório"
      />
      <Input label="E-mail" placeholder="Seu nome" />
    </Center>
  );
}

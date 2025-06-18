export function formatCPF(cpf: number | string): string {
  const digits = cpf.toString();

  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 6);
  const part3 = digits.slice(6, 9);
  const part4 = digits.slice(9, 11);

  return `${part1}.${part2}.${part3}-${part4}`;
}

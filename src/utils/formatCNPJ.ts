export function formatCNPJ(cnpj: number | string): string {
  const digits = cnpj.toString();

  const part1 = digits.slice(0, 2);
  const part2 = digits.slice(2, 5);
  const part3 = digits.slice(5, 8);
  const part4 = digits.slice(8, 12);
  const part5 = digits.slice(12, 14);

  return `${part1}.${part2}.${part3}/${part4}-${part5}`;
}

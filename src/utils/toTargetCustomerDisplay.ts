export type TargetCustomer = "MALE" | "FEMALE" | "ALL";

const targetCustomerDisplay: Record<TargetCustomer, string> = {
  MALE: "Moda Masculina",
  FEMALE: "Moda Feminina",
  ALL: "Todos os públicos",
};

export function toTargetCustomerDisplay(targetCustomer: TargetCustomer) {
  return targetCustomerDisplay[targetCustomer];
}

export function formatPhoneNumber(phoneNumber: number | string): string {
  const digits = phoneNumber.toString();

  const areaCode = digits.slice(0, 2);
  const firstDigit = digits.slice(2, 3);
  const firstGroup = digits.slice(3, 7);
  const secondGroup = digits.slice(7, 11);

  return `(${areaCode}) ${firstDigit} ${firstGroup}-${secondGroup}`;
}

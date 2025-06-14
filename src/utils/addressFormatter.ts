type Address = {
  number: string;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
};

export function shortenAddress(address: Address) {
  const abbreviations: any = {
    avenida: "Av.",
    rua: "R.",
    rodovia: "Rod.",
    estrada: "Est.",
    travessa: "Tv.",
    alameda: "Al.",
    praça: "Pça.",
  };

  let street = address.street.trim();

  const match = street.match(/^(\w+)\s+(.*)/i);
  if (match) {
    const type = match[1].toLowerCase();
    const rest = match[2];
    const abbreviated = abbreviations[type] || match[1];
    street = `${abbreviated} ${rest}`;
  }

  return `${address.city} - ${street}, ${address.number}`;
}

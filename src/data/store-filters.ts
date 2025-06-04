export const filters = [
  {
    filter: "IS_FAVORITE",
    displayName: "Favoritos",
    type: "toggle",
  },
  {
    filter: "TARGET_CUSTOMER",
    displayName: "Público alvo",
    type: "drawer",
    options: [
      { displayName: "Todos", value: "ALL" },
      { displayName: "Moda Feminina", value: "FEMALE" },
      { displayName: "Moda Masculina", value: "MALE" },
    ],
  },
];

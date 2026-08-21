export const DefaultPageSizes = {
  USERS: 10,
  ORDERS: 5,
  CATEGORIES: 30,
  PRODUCTS: 20,
} as const satisfies Record<string, number>;

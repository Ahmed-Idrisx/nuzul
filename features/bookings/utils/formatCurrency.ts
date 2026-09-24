export const formatCurrency = (value: string) =>
  `$${Number(value || 0).toFixed(2)}`;

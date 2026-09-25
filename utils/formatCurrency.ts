export const formatCurrency = (value: string | number) =>
  `$${Number(value || 0).toFixed(2)}`;

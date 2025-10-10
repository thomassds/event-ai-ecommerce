export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const calculateAdminTax = (baseValue: number): number => {
  console.warn(
    "DEPRECATED: calculateAdminTax - Use valores de taxa do backend"
  );
  return baseValue * 0.1;
};

export const formatAdminTax = (baseValue: number | string): string => {
  console.warn("DEPRECATED: formatAdminTax - Use valores de taxa do backend");

  let numericValue: number;

  if (typeof baseValue === "string") {
    const cleanValue = baseValue.replace(/[^\d.,]/g, "").replace(",", ".");
    numericValue = parseFloat(cleanValue) || 0;
  } else {
    numericValue = baseValue || 0;
  }

  const adminTax = calculateAdminTax(numericValue);

  return formatCurrency(adminTax);
};

export const formatBackendTax = (backendTaxValue: number): string => {
  return formatCurrency(backendTaxValue);
};

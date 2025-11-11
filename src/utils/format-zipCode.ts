export const showZipCode = (value: string | undefined) => {
  if (!value) return "";

  const onlyDigits = value.replace(/\D/g, "");

  return onlyDigits.replace(/(\d{5})(\d)/, "$1-$2");
};

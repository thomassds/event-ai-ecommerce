export function formatPhoneNumber(value: string): string {
  const cleanValue = value.replace(/\D/g, "");

  const limitedValue = cleanValue.substring(0, 11);

  if (limitedValue.length <= 2) {
    return limitedValue;
  } else if (limitedValue.length <= 7) {
    return limitedValue.replace(/(\d{2})(\d+)/, "($1) $2");
  } else if (limitedValue.length <= 10) {
    return limitedValue.replace(/(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
  } else {
    return limitedValue.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
}

export function unformatPhoneNumber(value: string): string {
  return value.replace(/\D/g, "");
}

export function validatePhoneNumber(phone: string): boolean {
  const cleanPhone = unformatPhoneNumber(phone);

  return cleanPhone.length === 10 || cleanPhone.length === 11;
}

export function isPhoneNumber(value: string): boolean {
  const cleanValue = unformatPhoneNumber(value);

  return (
    /^\d+$/.test(cleanValue) &&
    cleanValue.length >= 8 &&
    cleanValue.length <= 11
  );
}

export function isEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export function formatDocument(
  value: string,
  type?: "CPF" | "CNPJ" | "PASSPORT"
): string {
  if (type === "PASSPORT") {
    return value
      .replace(/[^A-Za-z0-9]/g, "")
      .substring(0, 20)
      .toUpperCase();
  }

  const cleanValue = value.replace(/\D/g, "");

  if (type === "CPF") {
    const cpf = cleanValue.substring(0, 11);
    return cpf
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else if (type === "CNPJ") {
    const cnpj = cleanValue.substring(0, 14);
    return cnpj
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }

  return cleanValue;
}

export const unformatDocument = (value: string): string => {
  return value.replace(/\D/g, "");
};

export const getDocumentType = (
  value: string
): "cpf" | "cnpj" | "passport" | "invalid" => {
  const numbers = unformatDocument(value);
  const alphanumeric = value.replace(/[^A-Za-z0-9]/g, "");

  if (numbers.length === 11) return "cpf";
  if (numbers.length === 14) return "cnpj";
  if (
    alphanumeric.length >= 6 &&
    alphanumeric.length <= 20 &&
    /[A-Za-z]/.test(alphanumeric)
  )
    return "passport";
  return "invalid";
};

export function validateCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/\D/g, "");

  if (cleanCPF.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(10))) return false;

  return true;
}

export function validateCNPJ(cnpj: string): boolean {
  const cleanCNPJ = cnpj.replace(/\D/g, "");

  if (cleanCNPJ.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;

  let sum = 0;
  let weight = 2;

  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }

  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;

  if (digit1 !== parseInt(cleanCNPJ.charAt(12))) return false;

  sum = 0;
  weight = 2;

  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }

  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;

  if (digit2 !== parseInt(cleanCNPJ.charAt(13))) return false;

  return true;
}

export function validatePassport(passport: string): boolean {
  const cleanPassport = passport.replace(/[^A-Za-z0-9]/g, "");

  if (cleanPassport.length < 6 || cleanPassport.length > 20) return false;

  if (!/[A-Za-z]/.test(cleanPassport)) return false;

  return true;
}

export function validateDocument(
  document: string,
  type?: "CPF" | "CNPJ" | "PASSPORT"
): boolean {
  if (type === "PASSPORT") {
    return validatePassport(document);
  }

  const cleanDocument = document.replace(/\D/g, "");

  if (cleanDocument.length === 11) {
    return validateCPF(document);
  } else if (cleanDocument.length === 14) {
    return validateCNPJ(document);
  }

  return false;
}

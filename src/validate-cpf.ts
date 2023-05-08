function isInvalidLength(cpf: string): boolean {
  return !cpf || cpf.length < 11 || cpf.length > 14;
}

function allDigitsAreEqual(cpf: string): boolean {
  return cpf.split("").every((c) => c === cpf[0]);
}

function removeNonDigits(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

function calculateDigit(cpf: string, factor: number): number {
  let total = 0;
  for (const digit of cpf) {
    if (factor > 1) {
      total += Number(digit) * factor--;
    }
  }
  const rest = total % 11;
  return rest < 2 ? 0 : 11 - rest;
}

export function validate(cpf: string): boolean {
  if (isInvalidLength(cpf)) return false;
  cpf = removeNonDigits(cpf);
  if (allDigitsAreEqual(cpf)) return false;
  const firstDigit = calculateDigit(cpf, 10);
  let secondDigit = calculateDigit(cpf, 11);
  const actualCheckDigit = cpf.slice(9);
  const calculatedCheckDigit = `${firstDigit}${secondDigit}`;
  return actualCheckDigit == calculatedCheckDigit;
}

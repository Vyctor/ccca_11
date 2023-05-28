export default class Cpf {
  value: string;

  constructor(readonly cpf: string) {
    if (!this.validate(cpf)) throw new Error("Invalid cpf");
    this.value = cpf;
  }

  private isValidLength(cpf: string) {
    return cpf.length !== 11;
  }

  private allDigitsTheSame(cpf: string) {
    return cpf.split("").every((c) => c === cpf[0]);
  }

  private removeNonDigits(cpf: string) {
    return cpf.replace(/\D/g, "");
  }

  private calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  public validate(cpf: string) {
    cpf = this.removeNonDigits(cpf);
    if (this.isValidLength(cpf)) return false;
    if (this.allDigitsTheSame(cpf)) return false;
    const dg1 = this.calculateDigit(cpf, 10);
    const dg2 = this.calculateDigit(cpf, 11);
    let actualCheckDigit = cpf.slice(9);
    const calculatedCheckDigit = `${dg1}${dg2}`;
    return actualCheckDigit === calculatedCheckDigit;
  }
}

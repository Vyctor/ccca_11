export default class Cpf {
  private _cpf: string;

  constructor(readonly cpf: string) {
    if (!this.validate(cpf)) {
      throw new Error("Invalid Cpf");
    }
    this._cpf = cpf;
  }

  isValid(): boolean {
    return true;
  }

  get value(): string {
    return this._cpf;
  }

  private isInvalidLength(cpf: string): boolean {
    return !cpf || cpf.length < 11 || cpf.length > 14;
  }

  private allDigitsAreEqual(cpf: string): boolean {
    return cpf.split("").every((c) => c === cpf[0]);
  }

  private removeNonDigits(cpf: string): string {
    return cpf.replace(/\D/g, "");
  }

  private calculateDigit(cpf: string, factor: number): number {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) {
        total += Number(digit) * factor--;
      }
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  private validate(cpf: string): boolean {
    if (this.isInvalidLength(cpf)) return false;
    cpf = this.removeNonDigits(cpf);
    if (this.allDigitsAreEqual(cpf)) return false;
    const firstDigit = this.calculateDigit(cpf, 10);
    let secondDigit = this.calculateDigit(cpf, 11);
    const actualCheckDigit = cpf.slice(9);
    const calculatedCheckDigit = `${firstDigit}${secondDigit}`;
    return actualCheckDigit == calculatedCheckDigit;
  }
}

export default class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expirationDate: Date
  ) {}

  isValid(date: Date): boolean {
    return date <= this.expirationDate;
  }

  calculateDiscount(value: number): number {
    return (value * this.percentage) / 100;
  }
}

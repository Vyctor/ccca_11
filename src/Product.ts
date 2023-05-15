export default class Product {
  constructor(
    readonly idProduct: number,
    readonly description: string,
    readonly price: number,
    readonly width: number,
    readonly height: number,
    readonly length: number,
    readonly weight: number
  ) {
    if (this.width <= 0 || this.height <= 0 || this.length <= 0) {
      throw new Error("Invalid dimensions");
    }
    if (this.weight <= 0) {
      throw new Error("Invalid weight");
    }
  }

  get volume(): number {
    return ((((this.width / 100) * this.height) / 100) * this.length) / 100;
  }

  get density(): number {
    return this.weight / this.volume;
  }
}

export default class Product {
  constructor(
    readonly idProduct: number,
    readonly description: string,
    readonly price: number,
    readonly width: number,
    readonly height: number,
    readonly length: number,
    readonly weight: number,
    readonly density: number = 0,
    readonly volume: number = 0
  ) {}
}

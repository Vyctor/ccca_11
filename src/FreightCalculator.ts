import Product from "./Product";

export default class FreightCalculator {
  static calculate(product: Product): number {
    let freight = product.volume * 1000 * (product.density / 100);
    freight = Math.max(10, freight);
    return freight;
  }
}

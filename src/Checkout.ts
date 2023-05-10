import { validate } from "./validate-cpf";
import ProductRepository from "./ProductRepository";
import CouponRepository from "./CouponRepository";

type Input = {
  cpf: string;
  items: Array<{
    idProduct: number;
    quantity: number;
  }>;
  coupon?: string;
  from?: string;
  to?: string;
};

type Output = {
  subtotal: number;
  total: number;
  freight: number;
};

export default class Checkout {
  private _subtotal: number;
  private _freight: number;
  private _total: number;

  constructor(
    private readonly _productRepository: ProductRepository,
    private readonly _couponRepository: CouponRepository
  ) {
    this._subtotal = 0;
    this._freight = 0;
    this._total = 0;
  }
  public async execute(input: Input): Promise<Output> {
    const { cpf, items, coupon, from, to } = input;

    if (!validate(cpf)) {
      throw new Error("Invalid cpf");
    }

    for (const item of items) {
      if (item.quantity <= 0) throw new Error("Invalid quantity");
      if (items.filter((i: any) => i.idProduct === item.idProduct).length > 1)
        throw new Error("Duplicated item");
      const productData = await this._productRepository.get(item.idProduct);
      const price = parseFloat(productData.price);
      this._subtotal += price * item.quantity;

      if (from && to) {
        const { width, height, length, weight } = productData;
        if (width <= 0 || height <= 0 || length <= 0)
          throw new Error("Invalid dimensions");
        if (weight <= 0) throw new Error("Invalid weight");
        const volume = ((((width / 100) * height) / 100) * length) / 100;
        const density = parseFloat(weight) / volume;
        let freight = volume * 1000 * (density / 100);
        freight = Math.max(10, freight);
        this._freight += freight * item.quantity;
      }
    }

    this._total = this._subtotal;

    if (coupon) {
      const couponData = await this._couponRepository.get(coupon);
      const today = new Date();
      if (couponData && couponData.expire_date.getTime() >= today.getTime()) {
        this._total -= (this._total * parseFloat(couponData.percentage)) / 100;
      }
    }

    this._total += this._freight;

    return {
      subtotal: this._subtotal,
      total: this._total,
      freight: this._freight,
    };
  }
}

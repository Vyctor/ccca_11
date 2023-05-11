import { validate } from "./validate-cpf";
import ProductRepository from "./ProductRepository";
import CouponRepository from "./CouponRepository";
import { OrderRepository } from "./OrderRepository";
import SimulateFreight from "./SimulateFreight";
import ValidateCoupon from "./ValidateCoupon";

type Input = {
  idOrder?: string;
  cpf: string;
  items: Array<{
    idProduct: number;
    quantity: number;
  }>;
  coupon?: string;
  from?: string;
  to?: string;
  email?: string;
  date?: Date;
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
    private readonly _couponRepository: CouponRepository,
    private readonly _orderRepository: OrderRepository
  ) {
    this._subtotal = 0;
    this._freight = 0;
    this._total = 0;
  }
  public async execute(input: Input): Promise<Output> {
    const { cpf, items, coupon, from, to, idOrder, date } = input;

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
        const simulateFreight = new SimulateFreight(this._productRepository);
        const { freight } = await simulateFreight.execute({
          items,
          from,
          to,
        });
        this._freight = freight;
      }
    }

    this._total = this._subtotal;
    const today = date ?? new Date();

    if (coupon) {
      const couponData = await this._couponRepository.get(coupon);
      const validateCoupon = new ValidateCoupon(this._couponRepository);
      const { isValid } = await validateCoupon.execute(coupon);
      if (isValid) {
        this._total -= (this._total * parseFloat(couponData.percentage)) / 100;
      }
    }
    this._total += this._freight;
    const sequence = await this._orderRepository.count();
    const code = `${today.getFullYear()}${new String(sequence + 1).padStart(
      8,
      "0"
    )}`;

    const order = {
      idOrder,
      code,
      cpf,
      total: this._total,
      freight: this._freight,
      items,
    };

    await this._orderRepository.save(order);

    return {
      subtotal: this._subtotal,
      total: this._total,
      freight: this._freight,
    };
  }
}

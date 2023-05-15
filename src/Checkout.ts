import { validate } from "./validate-cpf";
import ProductRepository from "./ProductRepository";
import CouponRepository from "./CouponRepository";
import { OrderRepository } from "./OrderRepository";
import FreightCalculator from "./FreightCalculator";
import Order from "./Order";

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
  total: number;
  freight: number;
};

export default class Checkout {
  constructor(
    private readonly _productRepository: ProductRepository,
    private readonly _couponRepository: CouponRepository,
    private readonly _orderRepository: OrderRepository
  ) {}
  public async execute(input: Input): Promise<Output> {
    const sequence = (await this._orderRepository.count()) + 1;
    const order = new Order(
      input.idOrder as string,
      input.cpf,
      input.date,
      sequence
    );
    for (const item of input.items) {
      const product = await this._productRepository.get(item.idProduct);
      order.addItem(product, item.quantity);

      if (input.from && input.to) {
        order.freight = FreightCalculator.calculate(product) * item.quantity;
      }
    }
    if (input.coupon) {
      const coupon = await this._couponRepository.get(input.coupon);
      if (coupon) {
        order.addCoupon(coupon);
      }
    }

    await this._orderRepository.save(order);

    return {
      total: order.total + order.freight,
      freight: order.freight,
    };
  }
}

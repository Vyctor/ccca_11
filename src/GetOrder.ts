import Order from "./Order";
import { OrderRepository } from "./OrderRepository";

export class GetOrder {
  constructor(readonly orderRepository: OrderRepository) {}

  public async execute(idOrder: string): Promise<Output> {
    const orderData = (await this.orderRepository.get(idOrder)) as Order;
    orderData.total = orderData.total;
    orderData.freight = orderData.freight;
    return orderData;
  }
}

type Output = {
  total: number;
  code: string;
};

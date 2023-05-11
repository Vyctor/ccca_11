import { OrderRepository } from "./OrderRepository";

export class GetOrder {
  constructor(readonly orderRepository: OrderRepository) {}

  public async execute(idOrder: string): Promise<Output> {
    const orderData = await this.orderRepository.get(idOrder);
    orderData.total = parseFloat(orderData.total);
    orderData.freight = parseFloat(orderData.freight);
    return orderData;
  }
}

type Output = {
  total: number;
  code: string;
};

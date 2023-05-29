import ProductRepository from "../repository/ProductRepository";
import CouponRepository from "../repository/CouponRepository";
import OrderRepository from "../repository/OrderRepository";
import Order from "../../domain/entity/Order";
import RepositoryFactory from "../factory/RepositoryFactory";
import GatewayFactory from "../factory/GatewayFactory";
import CatalogGateway from "../gateway/CatalogGateway";
import FreightGateway from "../gateway/FreightGateway";

export default class Checkout {
  private readonly orderRepository: OrderRepository;
  private readonly couponRepository: CouponRepository;
  private readonly catalogGateway: CatalogGateway;
  private readonly freightGateway: FreightGateway;

  constructor(
    repositoryFactory: RepositoryFactory,
    gatewayFactory: GatewayFactory,
    freightGateway: FreightGateway
  ) {
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.couponRepository = repositoryFactory.createCouponRepository();
    this.catalogGateway = gatewayFactory.createCatalogGateway();
    this.freightGateway = freightGateway;
  }
  async execute(input: Input): Promise<Output> {
    const sequence = await this.orderRepository.count();
    const order = new Order(input.idOrder, input.cpf, input.date, sequence + 1);
    const inputFreight: any = {
      items: [],
      from: input.from,
      to: input.to,
    };
    for (const item of input.items) {
      const product = await this.catalogGateway.getProduct(item.idProduct);
      order.addItem(product, item.quantity);
      inputFreight.items.push({
        volume: product.volume,
        density: product.density,
        quantity: item.quantity,
      });
    }
    if (input.from && input.to) {
      const freightResponse = await this.freightGateway.simulateFreight(
        inputFreight
      );
      order.freight = freightResponse.freight;
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.get(input.coupon);
      if (coupon) {
        order.addCoupon(coupon);
      }
    }
    await this.orderRepository.save(order);
    return {
      freight: order.freight,
      total: order.getTotal(),
    };
  }
}

type Input = {
  idOrder?: string;
  cpf: string;
  email?: string;
  items: { idProduct: number; quantity: number }[];
  date?: Date;
  coupon?: string;
  from?: string;
  to?: string;
};

type Output = {
  freight: number;
  total: number;
};

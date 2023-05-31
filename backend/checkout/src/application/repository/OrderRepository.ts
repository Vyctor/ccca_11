import Order from "../../domain/entity/Order";

export default interface OrderRepository {
  get(uuid: string): Promise<Order>;
  save(order: Order): Promise<void>;
  clear(): Promise<void>;
  count(): Promise<number>;
}

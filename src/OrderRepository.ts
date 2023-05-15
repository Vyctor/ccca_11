import Order from "./Order";

export interface OrderRepository {
  get(uuid: string): Promise<Order | undefined>;
  save(order: Order): Promise<void>;
  clear(): Promise<void>;
  count(): Promise<number>;
}

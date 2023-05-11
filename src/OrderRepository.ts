export interface OrderRepository {
  get(uuid: string): Promise<any>;
  save(order: any): Promise<void>;
  clear(): Promise<void>;
  count(): Promise<number>;
}

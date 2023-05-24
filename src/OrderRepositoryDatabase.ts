import DatabaseConnection from "./DatabaseConnection";
import Order from "./Order";
import OrderRepository from "./OrderRepository";

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(private readonly connection: DatabaseConnection) {}

  async get(idOrder: string): Promise<any> {
    const [orderData] = await this.connection.query(
      "select * from cccat11.order where id_order = $1",
      [idOrder]
    );
    return orderData;
  }

  async save(order: Order): Promise<void> {
    await this.connection.query(
      "insert into cccat11.order (id_order, code, cpf, total, freight) values ($1, $2, $3, $4, $5)",
      [order.idOrder, order.code, order.cpf, order.getTotal(), order.freight]
    );
  }

  async clear(): Promise<void> {
    await this.connection.query("delete from cccat11.order", []);
  }

  async count(): Promise<number> {
    const [data] = await this.connection.query(
      "select count(*)::integer from cccat11.order",
      []
    );
    return data.count;
  }
}

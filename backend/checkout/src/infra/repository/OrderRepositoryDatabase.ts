import DatabaseConnection from "../database/DatabaseConnection";
import Order from "../../domain/entity/Order";
import OrderRepository from "../../application/repository/OrderRepository";
import Item from "../../domain/entity/Item";

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(private readonly connection: DatabaseConnection) {}

  async get(idOrder: string): Promise<Order> {
    const [orderData] = await this.connection.query(
      "select * from cccat11.order where id_order = $1",
      [idOrder]
    );
    const order = new Order(
      orderData.id_order,
      orderData.cpf,
      orderData.date,
      orderData.sequence
    );
    const [itemsData] = await this.connection.query(
      "select * from cccat11.order_item where id_order = $1",
      [idOrder]
    );
    itemsData.forEach((item: any) => {
      order.items.push(
        new Item(item.id_product, parseFloat(item.price), item.quantity)
      );
    });
    return order;
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

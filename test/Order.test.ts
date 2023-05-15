import crypto from "crypto";
import Product from "../src/Product";
import Order from "../src/Order";
import Coupon from "../src/Coupon";

describe("Order unit tests", () => {
  let products: Array<Product>;

  beforeEach(() => {
    products = [
      new Product(1, "A", 1000, 100, 30, 10, 3),
      new Product(2, "B", 5000, 50, 50, 50, 22),
      new Product(3, "C", 30, 10, 10, 10, 0.9),
      new Product(4, "D", 1000, -100, 30, 10, 3),
      new Product(5, "E", 1000, 100, 30, 10, -3),
    ];
  });
  it("Deve criar um pedido vazio", async () => {
    const idOrder = crypto.randomUUID();
    const cpf = "778.278.412-36";
    const order = new Order(idOrder, cpf, new Date(), 1);
    expect(order.total).toBe(0);
  });
  it("Não deve criar um pedido com cpf inválido", async () => {
    const idOrder = crypto.randomUUID();
    const cpf = "111.111.123-00";

    expect(() => new Order(idOrder, cpf, new Date(), 1)).toThrowError(
      "Invalid Cpf"
    );
  });
  it("Deve criar um pedido com 3 itens", async () => {
    const idOrder = crypto.randomUUID();
    const cpf = "778.278.412-36";
    const order = new Order(idOrder, cpf, new Date(), 1);
    order.addItem(products[0], 1);
    order.addItem(products[1], 1);
    order.addItem(products[2], 1);
    expect(order.total).toBe(6030);
  });
  it("Não deve criar um pedido com itens duplicados", async () => {
    const idOrder = crypto.randomUUID();
    const cpf = "778.278.412-36";
    const order = new Order(idOrder, cpf, new Date(), 1);
    order.addItem(products[0], 1);
    expect(() => order.addItem(products[0], 1)).toThrowError("Duplicated item");
  });
  it("Deve criar um pedido e gerar o código", async () => {
    const idOrder = crypto.randomUUID();
    const cpf = "778.278.412-36";
    const order = new Order(idOrder, cpf, new Date(), 1);
    order.addItem(products[0], 1);
    order.addItem(products[1], 1);
    order.addItem(products[2], 1);
    expect(order.total).toBe(6030);
    expect(order.code).toBe(`202300000001`);
  });
  it("Deve criar um pedido com 3 itens com desconto", async () => {
    const idOrder = crypto.randomUUID();
    const cpf = "778.278.412-36";
    const order = new Order(idOrder, cpf, new Date(), 1);
    order.addItem(products[0], 1);
    order.addItem(products[1], 1);
    order.addItem(products[2], 1);
    order.addCoupon(new Coupon("VALE20", 20, new Date("2023-10-01T10:00:00")));
    expect(order.total).toBe(4872);
  });
});

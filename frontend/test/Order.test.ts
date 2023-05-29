import Order from "../src/entity/Order";
import Product from "../src/entity/Product";

test("Deve testar o pedido", () => {
  const order = new Order();
  order.addItem(new Product(1, "Produto 1", 100));
  order.addItem(new Product(1, "Produto 1", 100));
  order.addItem(new Product(1, "Produto 1", 100));

  expect(order.getTotal()).toBe(300);
  expect(order.items).toHaveLength(1);
});

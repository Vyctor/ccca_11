import ProductRepository from "../src/ProductRepository";
import ProductRepositoryDatabase from "../src/ProductRepositoryDatabase";
import SimulateFreight from "../src/SimulateFreight";

test("Deve simular o frete", async () => {
  const productRepository: ProductRepository = new ProductRepositoryDatabase();

  const input = {
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
    from: "88015600",
    to: "22030060",
  };

  const simulateFreight = new SimulateFreight(productRepository);
  const output = await simulateFreight.execute(input);
  expect(output.freight).toBe(280);
});

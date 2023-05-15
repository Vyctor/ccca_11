import FreightCalculator from "../src/FreightCalculator";
import Product from "../src/Product";

describe("Freight Calculator unit tests", () => {
  it("Deve calcular o frete", async () => {
    const product = new Product(1, "A", 1000, 100, 30, 10, 3);
    const freight = FreightCalculator.calculate(product);
    expect(freight).toBe(30);
  });

  it("Deve calcular o frete com frete mínimo", async () => {
    const product = new Product(1, "A", 1000, 10, 10, 10, 0.9);
    const freight = FreightCalculator.calculate(product);
    expect(freight).toBe(10);
  });
});

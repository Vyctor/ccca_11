import Product from "../../src/domain/entity/Product";

describe("Product unit tests", () => {
  it("Deve calcular o volume", function () {
    const product = new Product(1, "A", 1000, 100, 30, 10, 3);
    expect(product.getVolume()).toBe(0.03);
  });
  it("Deve calcular a densidade", function () {
    const product = new Product(1, "A", 1000, 100, 30, 10, 3);
    expect(product.getDensity()).toBe(100);
  });
  it("Não deve criar produto com dimensões inválidas", function () {
    expect(() => new Product(1, "A", 1000, -100, -100, -100, 10)).toThrow(
      new Error("Invalid dimensions")
    );
  });
  it("Não deve criar produto com peso inválido", function () {
    expect(() => new Product(1, "A", 1000, 100, 100, 100, -10)).toThrow(
      new Error("Invalid weight")
    );
  });
});

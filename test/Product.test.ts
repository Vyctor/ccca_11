import Product from "../src/Product";

describe("Product unit tests", () => {
  it("Deve calcular o volume", () => {
    const product = new Product(1, "Produto 1", 1000, 100, 30, 10, 3);
    expect(product.volume).toBe(0.03);
  });

  it("Deve calcular a densidade", () => {
    const product = new Product(1, "Produto 1", 1000, 100, 30, 10, 3);
    expect(product.density).toBe(100);
  });
  it("Não deve criar um produto com dimensões inválidas", () => {
    expect(
      () => new Product(1, "Produto 1", 1000, 100, -30, 10, 3)
    ).toThrowError("Invalid dimensions");
  });

  it("Não deve criar um produto com peso inválido", () => {
    expect(
      () => new Product(1, "Produto 1", 1000, 100, 30, 10, -3)
    ).toThrowError("Invalid weight");
  });
});

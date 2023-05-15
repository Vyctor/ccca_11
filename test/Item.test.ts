import Item from "../src/Item";

describe("Item unit tests", () => {
  it("Não deve criar um item com quantidade inválida", () => {
    expect(() => new Item(1, 1000, -1)).toThrowError("Invalid quantity");
  });
});

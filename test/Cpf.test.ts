import Cpf from "../src/Cpf";

describe("CPF unit test", () => {
  it("Deve criar um cpf válido", async () => {
    const cpf = new Cpf("778.278.412-36");
    expect(cpf).toBeDefined();
  });

  it("Não deve criar um cpf inválido", async () => {
    expect(() => new Cpf("111.111.123-00")).toThrowError("Invalid Cpf");
  });
});

import Cpf from "../../src/domain/entity/Cpf";

test.each(["407.302.170-27", "684.053.160-00", "746971314ß01"])(
  "Deve criar um cpf válido %s",
  function (cpf: string) {
    expect(() => new Cpf(cpf)).toBeDefined();
  }
);

test.each(["406.302.170-27", "683.053.160-00", "746.971.314"])(
  "Não deve criar um cpf inválido",
  function (cpf: string) {
    expect(() => new Cpf(cpf)).toThrow(new Error("Invalid cpf"));
  }
);

test.each(["111.111.111-11", "222.222.222-22", "333.333.333-33"])(
  "Deve testar um cpf com dígitos iguais %s",
  function (cpf: string) {
    expect(() => new Cpf(cpf)).toThrow(new Error("Invalid cpf"));
  }
);

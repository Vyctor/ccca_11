import { validate } from "../src/validate-cpf";

test.each([
  `198.295.120-61`,
  "387.147.692-71",
  "081.414.213-36",
  `288.157.419-09`,
])(`Deve testar um cpf válido %s`, (cpf: string) => {
  const isValid = validate(cpf);

  expect(isValid).toBeTruthy();
});

test;

test.each([
  `198.295.220-61`,
  "198.295.0-61",
  `198.295.220`,
  `198.295.220-`,
  `.220-61`,
])(`Deve testar um cpf inválido %s`, (cpf: string) => {
  const isValid = validate(cpf);

  expect(isValid).toBeFalsy();
});

test.each([
  `111.111.111-11`,
  "222.222.222-22",
  `333.333.333-33`,
  `444.444.444-44`,
])(`Deve testar um cpf com dígitos iguais %s`, (cpf: string) => {
  const isValid = validate(cpf);

  expect(isValid).toBeFalsy();
});

test.each([null, undefined])(
  `Deve testar um cpf com dígitos iguais %s`,
  (cpf: any) => {
    const isValid = validate(cpf);

    expect(isValid).toBeFalsy();
  }
);

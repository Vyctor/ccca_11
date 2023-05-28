import DatabaseConnection from "../../src/infra/database/DatabaseConnection";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ValidateCoupon from "../../src/application/usecase/ValidateCoupon";

let validateCoupon: ValidateCoupon;

let connection: DatabaseConnection;

beforeEach(async () => {
  connection = new PgPromiseAdapter();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  validateCoupon = new ValidateCoupon(repositoryFactory);
});

afterEach(async () => {
  await connection.close();
});

test("Deve validar o cupom de desconto válido", async function () {
  const input = "VALE20";
  const output = await validateCoupon.execute(input);
  expect(output.isValid).toBe(true);
});

test("Deve validar o cupom de desconto expirado", async function () {
  const input = "VALE10";
  const output = await validateCoupon.execute(input);
  expect(output.isValid).toBe(false);
});

test("Deve validar o cupom de desconto inexistente", async function () {
  const input = "VALE99";
  const output = await validateCoupon.execute(input);
  expect(output.isValid).toBe(false);
});

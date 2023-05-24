import DatabaseConnection from "../src/DatabaseConnection";
import DatabaseRepositoryFactory from "../src/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../src/PgPromiseAdapter";
import ValidateCoupon from "../src/ValidateCoupon";

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

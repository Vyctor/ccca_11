import Coupon from "../../src/domain/entity/Coupon";
import CouponRepository from "../../src/application/repository/CouponRepository";
import CouponRepositoryDatabase from "../../src/infra/repository/CouponRepositoryDatabase";
import DatabaseConnection from "../../src/infra/database/DatabaseConnection";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";

let couponRepository: CouponRepository;
let connection: DatabaseConnection;

beforeEach(async () => {
  connection = new PgPromiseAdapter();
  couponRepository = new CouponRepositoryDatabase(connection);
});

afterEach(async () => {
  await connection.close();
});

test("Deve retornar um cupom válido", async function () {
  const coupon = await couponRepository.get("VALE20");
  expect(coupon).toBeDefined();
  expect(coupon).toBeInstanceOf(Coupon);
});

test("Deve retornar undefined se o cupom não existir", async function () {
  const coupon = await couponRepository.get("99");
  expect(coupon).toBe(undefined);
});

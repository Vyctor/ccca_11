import Coupon from "../src/Coupon";
import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase";

test("Deve retornar um cupom válido", async function () {
  const couponRepository = new CouponRepositoryDatabase();
  const coupon = await couponRepository.get("VALE20");
  expect(coupon).toBeDefined();
  expect(coupon).toBeInstanceOf(Coupon);
});

test("Deve retornar undefined se o cupom não existir", async function () {
  const couponRepository = new CouponRepositoryDatabase();
  const coupon = await couponRepository.get("99");
  expect(coupon).toBe(undefined);
});

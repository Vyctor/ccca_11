import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase";
import ValidateCoupon from "../src/ValidateCoupon";

test("Deve validar o cupom de desconto válido", async () => {
  const input = "VALE20";
  const couponRepository = new CouponRepositoryDatabase();
  const validateCoupon = new ValidateCoupon(couponRepository);
  const output = await validateCoupon.execute(input);
  expect(output.isValid).toBe(true);
});

test("Deve validar o cupom de desconto expirado", async () => {
  const input = "VALE10";
  const couponRepository = new CouponRepositoryDatabase();
  const validateCoupon = new ValidateCoupon(couponRepository);
  const output = await validateCoupon.execute(input);
  expect(output.isValid).toBe(false);
});

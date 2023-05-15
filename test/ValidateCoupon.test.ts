import Coupon from "../src/Coupon";
import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase";
import ValidateCoupon from "../src/ValidateCoupon";

describe("ValidateCoupon unit tests", () => {
  it("Deve verificar o cupom de desconto válido", async () => {
    const input = "VALE20";
    const couponRepository = new CouponRepositoryDatabase();
    jest
      .spyOn(couponRepository, "get")
      .mockResolvedValue(
        new Coupon("VALE20", 20, new Date("2023-10-10T00:00:00"))
      );
    const validateCoupon = new ValidateCoupon(couponRepository);
    const output = await validateCoupon.execute(input);
    expect(output.isValid).toBe(true);
  });

  it("Deve verificar o cupom de desconto expirado", async () => {
    const input = "VALE10";
    const couponRepository = new CouponRepositoryDatabase();
    const validateCoupon = new ValidateCoupon(couponRepository);
    const output = await validateCoupon.execute(input);
    expect(output.isValid).toBe(false);
  });
});

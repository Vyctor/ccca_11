import Coupon from "../src/Coupon";

describe("Coupon unit test", () => {
  it("Deve testar se o cupom de desconto é valido", () => {
    const coupon = new Coupon("VALE20", 20, new Date("2023-10-10T00:00:00"));
    const today = new Date("2021-10-10T00:00:00");
    expect(coupon.code).toBe("VALE20");
    expect(coupon.percentage).toBe(20);
    expect(coupon.expirationDate).toEqual(new Date("2023-10-10T00:00:00"));
    expect(coupon.isValid(today)).toBe(true);
  });
  it("Deve testar se o cupom de desconto é invalido", () => {
    const coupon = new Coupon("VALE20", 20, new Date("2023-10-10T00:00:00"));

    const today = new Date("2024-10-10T00:00:00");

    expect(coupon.code).toBe("VALE20");
    expect(coupon.percentage).toBe(20);
    expect(coupon.expirationDate).toEqual(new Date("2023-10-10T00:00:00"));
    expect(coupon.isValid(today)).toBe(false);
  });

  it("Deve calcular o disconto", () => {
    const coupon = new Coupon("VALE20", 20, new Date("2023-10-10T00:00:00"));
    const today = new Date("2021-10-10T00:00:00");
    expect(coupon.code).toBe("VALE20");
    expect(coupon.percentage).toBe(20);
    expect(coupon.expirationDate).toEqual(new Date("2023-10-10T00:00:00"));
    expect(coupon.isValid(today)).toBe(true);
    expect(coupon.calculateDiscount(1000)).toBe(200);
  });
});

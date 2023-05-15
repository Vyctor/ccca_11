import CouponRepository from "./CouponRepository";

export default class ValidateCoupon {
  constructor(private readonly _couponRepository: CouponRepository) {}

  async execute(code: string): Promise<Output> {
    const output = {
      isValid: false,
    };
    const coupon = await this._couponRepository.get(code);
    if (!coupon) {
      return output;
    }
    const today = new Date();
    output.isValid = coupon.isValid(today);
    return output;
  }
}

type Output = {
  isValid: boolean;
};

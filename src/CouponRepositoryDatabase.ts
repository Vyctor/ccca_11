import pgPromise from "pg-promise";
import CouponRepository from "./CouponRepository";
import Coupon from "./Coupon";

export default class CouponRepositoryDatabase implements CouponRepository {
  async get(code: string): Promise<Coupon | undefined> {
    const connection = pgPromise()(
      "postgres://postgres:postgres@localhost:5432/app"
    );
    const [couponData] = await connection.query(
      `select * from cccat11.coupon where code = '${code}'`
    );
    await connection.$pool.end();
    const { code: codeCoupon, percentage, expiration_date } = couponData;
    if (!codeCoupon) {
      return undefined;
    }
    const coupon = new Coupon(codeCoupon, percentage, expiration_date);
    return coupon;
  }
}

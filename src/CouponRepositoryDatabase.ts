import pgPromise from "pg-promise";
import CouponRepository from "./CouponRepository";

export default class CouponRepositoryDatabase implements CouponRepository {
  async get(code: string) {
    const connection = pgPromise()(
      "postgres://postgres:postgres@localhost:5432/app"
    );
    const [couponData] = await connection.query(
      `select * from cccat11.coupon where code = '${code}'`
    );
    await connection.$pool.end();
    return couponData;
  }
}

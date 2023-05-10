import pgPromise from "pg-promise";
import ProductRepository from "./ProductRepository";

export default class ProductRepositoryDatabase implements ProductRepository {
  async get(idProduct: number) {
    const connection = pgPromise()(
      "postgres://postgres:postgres@localhost:5432/app"
    );
    const [productData] = await connection.query(
      `select * from cccat11.product where id_product = ${idProduct}`
    );
    await connection.$pool.end();
    return productData;
  }
}

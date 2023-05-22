import pgp from "pg-promise";
import ProductRepository from "./ProductRepository";
import Product from "./Product";

export default class ProductRepositoryDatabase implements ProductRepository {
  async get(idProduct: number) {
    const connection = pgp()("postgres://postgres:postgres@localhost:5432/app");
    const [productData] = await connection.query(
      "select * from cccat11.product where id_product = $1",
      [idProduct]
    );
    await connection.$pool.end();
    return new Product(
      productData.id_product,
      productData.description,
      parseFloat(productData.price),
      productData.width,
      productData.height,
      productData.length,
      parseFloat(productData.weight)
    );
  }
}

import pgPromise from "pg-promise";
import ProductRepository from "./ProductRepository";
import Product from "./Product";

export default class ProductRepositoryDatabase implements ProductRepository {
  async get(idProduct: number): Promise<Product> {
    const connection = pgPromise()(
      "postgres://postgres:postgres@localhost:5432/app"
    );
    const [productData] = await connection.query(
      `select * from cccat11.product where id_product = ${idProduct}`
    );
    await connection.$pool.end();

    const { id_product, description, price, width, height, length, weight } =
      productData;

    const product = new Product(
      id_product,
      description,
      price,
      width,
      height,
      length,
      weight
    );

    return product;
  }
}

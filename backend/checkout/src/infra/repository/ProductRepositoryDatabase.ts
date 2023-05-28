import ProductRepository from "../../application/repository/ProductRepository";
import Product from "../../domain/entity/Product";
import DatabaseConnection from "../database/DatabaseConnection";

export default class ProductRepositoryDatabase implements ProductRepository {
  constructor(private readonly connection: DatabaseConnection) {}
  async list(): Promise<Product[]> {
    const productsData = await this.connection.query(
      "select * from cccat11.product",
      []
    );
    const products = productsData.map((product: any) => {
      return new Product(
        product.id_product,
        product.description,
        parseFloat(product.price),
        product.width,
        product.height,
        product.length,
        parseFloat(product.weight)
      );
    });
    return products;
  }

  async get(idProduct: number) {
    const [productData] = await this.connection.query(
      "select * from cccat11.product where id_product = $1",
      [idProduct]
    );
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

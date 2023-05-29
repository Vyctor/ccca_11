import CatalogGateway from "../../application/gateway/CatalogGateway";
import Product from "../../domain/entity/Product";

import HttpClient from "../http/HttpClient";

export default class CatalogHttpGateway implements CatalogGateway {
  constructor(private readonly httpClient: HttpClient) {}
  async getProduct(idProduct: number): Promise<Product> {
    const productData = await this.httpClient.get(
      `http://localhost:3001/products/${idProduct}`
    );

    return new Product(
      productData.idProduct,
      productData.description,
      productData.price,
      productData.width,
      productData.height,
      productData.length,
      productData.weight,
      productData.density,
      productData.volume
    );
  }
}

import axios from "axios";
import CheckoutGateway from "./CheckoutGateway";
import Product from "../entity/Product";
import Order from "../entity/Order";
import HttpClient from "../http/HttpClient";

export default class HttpCheckoutGateway implements CheckoutGateway {
  constructor(private readonly httpClient: HttpClient) {}
  async getProducts(): Promise<Product[]> {
    const response = await this.httpClient.get(
      "http://localhost:3000/products"
    );
    return response.map(
      (product: any) =>
        new Product(product.idProduct, product.description, product.price)
    );
  }

  async checkout(order: Order): Promise<any> {
    const response = await this.httpClient.post(
      "http://localhost:3000/checkout",
      order
    );
    return response;
  }
}

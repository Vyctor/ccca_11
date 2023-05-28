import HttpServer from "./HttpServer";
import UsecaseFactory from "./UsecaseFactory";

export default class HttpController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly usecaseFactory: UsecaseFactory
  ) {
    this.httpServer.on(
      "post",
      "/checkout",
      async (params: any, body: any, headers: any) => {
        const checkout = this.usecaseFactory.createCheckout();
        const output = await checkout.execute(body);
        return output;
      }
    );
    this.httpServer.on(
      "get",
      "/products",
      async (params: any, body: any, headers: any) => {
        const contentType = headers["content-type"];
        const getProducts = this.usecaseFactory.createGetProducts(contentType);
        const output = await getProducts.execute();
        return output;
      }
    );
  }
}

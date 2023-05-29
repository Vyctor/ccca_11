import HttpServer from "./HttpServer";
import UsecaseFactory from "../factory/UsecaseFactory";

export default class HttpController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly usecaseFactory: UsecaseFactory
  ) {
    this.httpServer.on(
      "post",
      "/simulateFreight",
      async (params: any, body: any, headers: any) => {
        const simulateFreight = this.usecaseFactory.createSimulateFreight();
        const output = await simulateFreight.execute(body);
        return output;
      }
    );
  }
}

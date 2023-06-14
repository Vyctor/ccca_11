import HttpServer from "./HttpServer";
import UsecaseFactory from "../factory/UsecaseFactory";

export default class HttpController {
  constructor(
    private readonly httpServer: HttpServer,
    private readonly usecaseFactory: UsecaseFactory
  ) {
    this.httpServer.on(
      "post",
      "/verify",
      async (params: any, body: any, headers: any) => {
        const { token } = body;
        const verify = this.usecaseFactory.createVerify();
        const output = await verify.execute(token);
        return output;
      }
    );
  }
}

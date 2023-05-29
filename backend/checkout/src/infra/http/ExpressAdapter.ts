import express, { Express, Request, Response } from "express";
import cors from "cors";
import HttpServer, { Method } from "./HttpServer";

export default class ExpressAdapter implements HttpServer {
  private readonly app: Express;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }
  on(method: Method, url: string, callback: Function): void {
    this.app[method](
      url,
      async function (request: Request, response: Response) {
        try {
          const output = await callback(
            request.params,
            request.body,
            request.headers
          );
          response.json(output);
        } catch (e: any) {
          response.status(422).json({ message: e.message });
        }
      }
    );
  }
  listen(port: number): void {
    this.app.listen(port);
  }
}

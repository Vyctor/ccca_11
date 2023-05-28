export default interface HttpServer {
  on(method: Method, url: string, callback: Function): void;
  listen(port: number): void;
}

export type Method =
  | "all"
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

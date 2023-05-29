import pgp from "pg-promise";
import DatabaseConnection from "./DatabaseConnection";

export default class PgPromiseAdapter implements DatabaseConnection {
  private connection: any;
  constructor() {
    this.connection = pgp()("postgres://postgres:postgres@localhost:5432/app");
  }
  async query(statement: string, params?: any[] | undefined): Promise<any> {
    return this.connection.query(statement, params);
  }
  async close(): Promise<void> {
    await this.connection.$pool.end();
  }
}

import ZipcodeRepository from "../../application/repository/ZipcodeRepository";
import Zipcode from "../../domain/entity/Zipcode";
import DatabaseConnection from "../database/DatabaseConnection";

export default class ZipcodeRepositoryDatabase implements ZipcodeRepository {
  constructor(private readonly database: DatabaseConnection) {}

  async get(code: string): Promise<Zipcode | undefined> {
    const [data] = await this.database.query(
      "SELECT * FROM cccat11.zipcode WHERE code = $1",
      [code]
    );

    if (!data) return;

    return new Zipcode(data.code, data.lat, data.long);
  }
}

import RepositoryFactory from "../../application/factory/RepositoryFactory";
import ZipcodeRepository from "../../application/repository/ZipcodeRepository";
import ZipcodeRepositoryDatabase from "../repository/ZipcodeRepositoryDatabase";
import PgPromiseAdapter from "../database/PgPromiseAdapter";
import DatabaseConnection from "../database/DatabaseConnection";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  constructor(private readonly connection: DatabaseConnection) {}
  createZipcodeRepository(): ZipcodeRepository {
    return new ZipcodeRepositoryDatabase(this.connection);
  }
}

import SimulateFreight from "../../application/usecase/SimulateFreight";
import DatabaseConnection from "../database/DatabaseConnection";
import DatabaseRepositoryFactory from "./DatabaseRepositoryFactory";

export default class UsecaseFactory {
  constructor(private readonly connection: DatabaseConnection) {}
  createSimulateFreight() {
    const repositoryFactory = new DatabaseRepositoryFactory(this.connection);
    return new SimulateFreight(repositoryFactory);
  }
}

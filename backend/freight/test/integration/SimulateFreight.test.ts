import RepositoryFactory from "../../src/application/factory/RepositoryFactory";
import SimulateFreight from "../../src/application/usecase/SimulateFreight";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import DatabaseConnection from "../../src/infra/database/DatabaseConnection";

describe("Simulate Freight integration test", () => {
  let simulateFreight: SimulateFreight;
  let connection: DatabaseConnection;
  let repositoryFactory: RepositoryFactory;

  beforeEach(async () => {
    connection = new PgPromiseAdapter();
    repositoryFactory = new DatabaseRepositoryFactory(connection);
    simulateFreight = new SimulateFreight(repositoryFactory);
  });

  afterEach(async () => {
    await connection.close();
  });

  it("Deve simular o frete sem origem e destino", async function () {
    const input = {
      items: [{ volume: 0.03, density: 100, quantity: 1 }],
      from: "88015000",
      to: "22030020",
    };
    const output = await simulateFreight.execute(input);
    expect(output.freight).toBe(30);
  });

  it("Deve simular o frete com cálculo da distância", async function () {
    const input = {
      items: [{ volume: 0.03, density: 100, quantity: 1 }],
      from: "88015600",
      to: "22060030",
    };
    const output = await simulateFreight.execute(input);
    expect(output.freight).toBe(22.446653340244893);
  });
});

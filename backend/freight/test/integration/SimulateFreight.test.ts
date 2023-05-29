import SimulateFreight from "../../src/application/usecase/SimulateFreight";
import DatabaseConnection from "../../src/infra/database/DatabaseConnection";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";

describe("Simulate Freight integration test", () => {
  let connection: DatabaseConnection;
  let simulateFreight: SimulateFreight;
  beforeEach(async () => {
    connection = new PgPromiseAdapter();
    simulateFreight = new SimulateFreight();
  });

  afterEach(async () => {
    await connection.close();
  });

  it("Deve simular o frete", async function () {
    const input = {
      items: [{ volume: 0.03, density: 100, quantity: 1 }],
      from: "88015600",
      to: "22030060",
    };
    const output = await simulateFreight.execute(input);
    expect(output.freight).toBe(30);
  });
});

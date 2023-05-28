import DatabaseConnection from "../src/infra/database/DatabaseConnection";
import DatabaseRepositoryFactory from "../src/infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";
import SimulateFreight from "../src/application/usecase/SimulateFreight";

let connection: DatabaseConnection;
let simulateFreight: SimulateFreight;
beforeEach(async () => {
  connection = new PgPromiseAdapter();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  simulateFreight = new SimulateFreight(repositoryFactory);
});

afterEach(async () => {
  await connection.close();
});

test("Deve simular o frete", async function () {
  const input = {
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
    from: "88015600",
    to: "22030060",
  };
  const output = await simulateFreight.execute(input);
  expect(output.freight).toBe(280);
});

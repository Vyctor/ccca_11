import DatabaseConnection from "../src/DatabaseConnection";
import DatabaseRepositoryFactory from "../src/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../src/PgPromiseAdapter";
import SimulateFreight from "../src/SimulateFreight";

let connection: DatabaseConnection;
let simulateFreight: SimulateFreight;
beforeEach(async () => {
  connection = new PgPromiseAdapter();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  simulateFreight = new SimulateFreight(repositoryFactory);
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

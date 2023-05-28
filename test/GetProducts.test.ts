import DatabaseRepositoryFactory from "../src/DatabaseRepositoryFactory";
import GetProducts from "../src/GetProducts";
import PgPromiseAdapter from "../src/PgPromiseAdapter";
import UsecaseFactory from "../src/UsecaseFactory";

let connection: PgPromiseAdapter;
let repositoryFactory: DatabaseRepositoryFactory;
let getProducts: GetProducts;

beforeEach(() => {
  connection = new PgPromiseAdapter();
  repositoryFactory = new DatabaseRepositoryFactory(connection);
  getProducts = new UsecaseFactory(repositoryFactory).createGetProducts(
    "application/json"
  );
});
afterEach(async () => {
  await connection.close();
});

test("Deve listar os produtos", async function () {
  const output = await getProducts.execute();
  expect(output).toHaveLength(3);
});

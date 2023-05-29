import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ProductRepository from "../../src/application/repository/ProductRepository";

let connection: PgPromiseAdapter;
let repositoryFactory: DatabaseRepositoryFactory;
let getProducts: ProductRepository;

beforeEach(() => {
  connection = new PgPromiseAdapter();
  repositoryFactory = new DatabaseRepositoryFactory(connection);
  getProducts = repositoryFactory.createProductRepository();
});
afterEach(async () => {
  await connection.close();
});

test("Deve listar os produtos", async function () {
  const output = await getProducts.list();
  expect(output).toHaveLength(3);
});

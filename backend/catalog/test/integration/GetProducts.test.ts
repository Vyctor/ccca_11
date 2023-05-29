import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import UsecaseFactory from "../../src/infra/factory/UsecaseFactory";
import GetProducts from "../../src/application/usecase/GetProducts";

let connection: PgPromiseAdapter;
let repositoryFactory: DatabaseRepositoryFactory;
let getProducts: GetProducts;

describe("GetProducts integration test", () => {
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

  it("Deve listar os produtos", async function () {
    const output = await getProducts.execute();
    expect(output).toHaveLength(3);
  });
});

import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import UsecaseFactory from "../../src/infra/factory/UsecaseFactory";
import GetProduct from "../../src/application/usecase/GetProduct";

describe("GetProducts integration test", () => {
  let connection: PgPromiseAdapter;
  let repositoryFactory: DatabaseRepositoryFactory;
  let getProduct: GetProduct;

  beforeEach(() => {
    connection = new PgPromiseAdapter();
    repositoryFactory = new DatabaseRepositoryFactory(connection);
    getProduct = new UsecaseFactory(repositoryFactory).createGetProduct();
  });
  afterEach(async () => {
    await connection.close();
  });

  it("Deve retornar um produto", async function () {
    const output = await getProduct.execute(1);
    expect(output.idProduct).toBe(1);
    expect(output.description).toBe("A");
    expect(output.price).toBe(1000);
    expect(output.width).toBe(100);
    expect(output.height).toBe(30);
    expect(output.length).toBe(10);
    expect(output.weight).toBe(3);
    expect(output.volume).toBe(0.03);
    expect(output.density).toBe(100);
  });
});

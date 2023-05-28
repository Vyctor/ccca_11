import DatabaseConnection from "../src/infra/database/DatabaseConnection";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";
import ProductRepository from "../src/application/repository/ProductRepository";
import ProductRepositoryDatabase from "../src/infra/repository/ProductRepositoryDatabase";

let productRepository: ProductRepository;
let connection: DatabaseConnection;

beforeEach(async () => {
  connection = new PgPromiseAdapter();
  productRepository = new ProductRepositoryDatabase(connection);
});

afterEach(async () => {
  await connection.close();
});

test("Deve obter um produto do banco de dados", async function () {
  const productData = await productRepository.get(1);
  expect(productData.price).toBe(1000);
});

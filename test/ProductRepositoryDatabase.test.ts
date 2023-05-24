import DatabaseConnection from "../src/DatabaseConnection";
import PgPromiseAdapter from "../src/PgPromiseAdapter";
import ProductRepository from "../src/ProductRepository";
import ProductRepositoryDatabase from "../src/ProductRepositoryDatabase";

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

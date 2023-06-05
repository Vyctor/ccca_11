import UserRepository from "../../src/application/repository/UserRepository";
import Login from "../../src/application/usecase/Login";
import Signup from "../../src/application/usecase/Signup";
import DatabaseConnection from "../../src/infra/database/DatabaseConnection";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import UserRepositoryDatabase from "../../src/infra/repository/UserRepositoryDatabase";

describe("Signup integration test", () => {
  let connection: DatabaseConnection;
  let userRepository: UserRepository;
  beforeEach(async () => {
    connection = new PgPromiseAdapter();
    userRepository = new UserRepositoryDatabase(connection);
  });

  afterEach(async () => {
    await userRepository.delete("joao@gmail.com");
    await connection.close();
  });

  it("Deve fazer um signup", async () => {
    const signup = new Signup(userRepository);
    const date = new Date("2022-03-01T00:00:00.000");
    const input = {
      email: "joao@gmail.com",
      password: "abc123",
      date,
    };
    await signup.execute(input);
    const login = new Login(userRepository);
    const output = await login.execute(input);
    expect(output.token).toBe(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjQ2MTAzNjAwMDAwLCJleHAiOjE2NDYxMDM2MDM2MDB9.lUdjM-N860o4J7C2GwIojoY28UTTKqNv4yHLm6uY72A"
    );
  });
});

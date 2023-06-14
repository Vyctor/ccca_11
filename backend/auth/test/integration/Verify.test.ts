import Verify from "../../src/application/usecase/Verify";

test("Deve verificar o token", async () => {
  const verify = new Verify();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjQ2MTAzNjAwMDAwLCJleHAiOjE2NDYxMDM2MDM2MDB9.lUdjM-N860o4J7C2GwIojoY28UTTKqNv4yHLm6uY72A";
  const output = await verify.execute(token);
  expect(output.email).toBe("joao@gmail.com");
});

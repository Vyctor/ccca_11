import axios from "axios";

axios.defaults.validateStatus = () => true;

test("Deve verificar um token", async () => {
  const input = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwiaWF0IjoxNjQ2MTAzNjAwMDAwLCJleHAiOjE2NDYxMDM2MDM2MDB9.lUdjM-N860o4J7C2GwIojoY28UTTKqNv4yHLm6uY72A",
  };

  const { data } = await axios.post("http://localhost:3004/verify", input);

  expect(data.email).toBe("joaow@gmail.com");
});

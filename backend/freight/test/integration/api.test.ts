import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

describe("API Test", () => {
  it("Deve calcular o frete", async function () {
    const input = {
      cpf: "407.302.170-27",
      items: [{ volume: 0.03, density: 100, quantity: 3 }],
      from: "88015600",
      to: "22030060",
    };
    const response = await axios.post(
      "http://localhost:3002/simulateFreight",
      input
    );
    const output = response.data;
    expect(output.freight).toBe(90);
  });
});

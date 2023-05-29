import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

describe("API Test", () => {
  it("Deve listar os produtos em JSON", async function () {
    const response = await axios.get("http://localhost:3001/products", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const output = response.data;

    expect(output).toHaveLength(3);
    expect(output[0].idProduct).toBe(1);
    expect(output[1].idProduct).toBe(2);
    expect(output[2].idProduct).toBe(3);
  });

  it("Deve listar os produtos em csv", async function () {
    const response = await axios.get("http://localhost:3001/products", {
      headers: {
        "Content-Type": "text/csv",
      },
    });
    const output = response.data;
    expect(output).toBe("1;A;1000\n2;B;5000\n3;C;30");
  });

  it("Deve retornar um producto", async function () {
    const response = await axios.get("http://localhost:3001/products/1");
    const output = response.data;
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

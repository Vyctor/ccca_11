import axios from "axios";

axios.defaults.validateStatus = () => true;

test(`Não deve criar pedido com cpf inválido`, async () => {
  const input = {
    cpf: "406.302.170-27",
  };
  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.message).toBe("Invalid cpf");
});

test("Deve fazer um pedido com três itens", async () => {
  const input = {
    cpf: `198.295.120-61`,
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  };

  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(6090);
});

test("Deve fazer um pedidos com 3 items e cupom de desconto", async () => {
  const input = {
    cpf: `198.295.120-61`,
    coupon: "VALE20",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  };

  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(4872);
});

test("Não deve aplicar um cupom expirado em um checkout", async () => {
  const input = {
    cpf: `198.295.120-61`,
    coupon: "VALE10",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  };

  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(6090);
});

test("Não deve aplicar um cupom inexistente em um checkout", async () => {
  const input = {
    cpf: `198.295.120-61`,
    coupon: "VALE99",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  };

  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.total).toBe(6090);
});

test("Não deve aceitar item com quantidade menor ou igual a zero", async () => {
  const input = {
    cpf: `198.295.120-61`,
    items: [{ idProduct: 1, quantity: -1 }],
  };

  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(response.status).toBe(422);
  expect(output.message).toBe("Invalid quantity");
});

test("Não deve aceitar item com item duplicado", async () => {
  const input = {
    cpf: `198.295.120-61`,
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 1, quantity: 1 },
    ],
  };

  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(response.status).toBe(422);
  expect(output.message).toBe("Duplicated item");
});

test("Deve fazer um pedido com três itens calculando o frete", async () => {
  const input = {
    cpf: `198.295.120-61`,
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
    ],
    from: "88015600",
    to: "22030060",
  };

  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.subtotal).toBe(6000);
  expect(output.freight).toBe(250);
  expect(output.total).toBe(6250);
});

test("Deve fazer um pedido com três itens calculando o frete com preço mínimo", async () => {
  const input = {
    cpf: `198.295.120-61`,
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
    from: "88015600",
    to: "22030060",
  };

  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(output.subtotal).toBe(6090);
  expect(output.freight).toBe(280);
  expect(output.total).toBe(6370);
});

test("Não deve fazer um pedido de produto com dimensões negativas", async () => {
  const input = {
    cpf: `198.295.120-61`,
    items: [{ idProduct: 4, quantity: 1 }],
    from: "88015600",
    to: "22030060",
  };

  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(response.status).toBe(422);
  expect(output.message).toBe("Invalid dimensions");
});

test("Não deve fazer um pedido de produto com peso negativo", async () => {
  const input = {
    cpf: `198.295.120-61`,
    items: [{ idProduct: 5, quantity: 1 }],
    from: "88015600",
    to: "22030060",
  };

  const response = await axios.post("http://localhost:3000/checkout", input);
  const output = response.data;
  expect(response.status).toBe(422);
  expect(output.message).toBe("Invalid weight");
});

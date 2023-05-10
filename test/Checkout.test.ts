import Checkout from "../src/Checkout";

let checkout: Checkout;

beforeEach(() => {
  const products: any = {
    1: {
      idProduct: 1,
      description: "A",
      price: 1000,
      width: 100,
      height: 30,
      length: 10,
      weight: 3,
    },
    2: {
      idProduct: 2,
      description: "B",
      price: 5000,
      width: 50,
      height: 50,
      length: 50,
      weight: 22,
    },
    3: {
      idProduct: 3,
      description: "C",
      price: 30,
      width: 10,
      height: 10,
      length: 10,
      weight: 0.9,
    },
    4: {
      idProduct: 4,
      description: "D",
      price: 1000,
      width: -100,
      height: 30,
      length: 10,
      weight: 3,
    },
    5: {
      idProduct: 5,
      description: "E",
      price: 1000,
      width: 100,
      height: 30,
      length: 10,
      weight: -3,
    },
  };

  const coupons: any = {
    VALE20: {
      percentage: 20,
      expire_date: new Date("2023-10-10T10:00:00"),
    },
    VALE10: {
      percentage: 10,
      expire_date: new Date("2022-10-10T10:00:00"),
    },
  };

  const productRepository = {
    async get(idProduct: number): Promise<any> {
      return products[idProduct];
    },
  };
  const couponRepository = {
    async get(code: string): Promise<any> {
      return coupons[code];
    },
  };

  checkout = new Checkout(productRepository, couponRepository);
});

test(`Não deve criar pedido com cpf inválido`, async () => {
  const input = {
    cpf: "406.302.170-27",
    items: [],
  };

  expect(async () => {
    await checkout.execute(input);
  }).rejects.toThrowError("Invalid cpf");
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

  const output = await checkout.execute(input);
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

  const output = await checkout.execute(input);
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

  const output = await checkout.execute(input);
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

  const output = await checkout.execute(input);
  expect(output.total).toBe(6090);
});

test("Não deve aceitar item com quantidade menor ou igual a zero", async () => {
  const input = {
    cpf: `198.295.120-61`,
    items: [{ idProduct: 1, quantity: -1 }],
  };

  expect(async () => {
    await checkout.execute(input);
  }).rejects.toThrowError("Invalid quantity");
});

test("Não deve aceitar item com item duplicado", async () => {
  const input = {
    cpf: `198.295.120-61`,
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 1, quantity: 1 },
    ],
  };

  expect(async () => {
    await checkout.execute(input);
  }).rejects.toThrowError("Duplicated item");
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

  const output = await checkout.execute(input);
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

  const output = await checkout.execute(input);
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

  expect(async () => {
    await checkout.execute(input);
  }).rejects.toThrowError("Invalid dimensions");
});

test("Não deve fazer um pedido de produto com peso negativo", async () => {
  const input = {
    cpf: `198.295.120-61`,
    items: [{ idProduct: 5, quantity: 1 }],
    from: "88015600",
    to: "22030060",
  };

  expect(async () => {
    await checkout.execute(input);
  }).rejects.toThrowError("Invalid weight");
});
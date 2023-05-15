import crypto from "crypto";
import axios from "axios";
import Checkout from "../src/Checkout";
import { GetOrder } from "../src/GetOrder";
import { OrderRepositoryDatabase } from "../src/OrderRepositoryDatabase";
import Product from "../src/Product";
import ProductRepository from "../src/ProductRepository";
import CouponRepository from "../src/CouponRepository";
import Coupon from "../src/Coupon";

axios.defaults.validateStatus = function () {
  return true;
};

describe("Checkout unit tests", () => {
  let checkout: Checkout;
  let getOrder: GetOrder;
  let productRepository: ProductRepository;
  let couponRepository: CouponRepository;
  let orderRepository: OrderRepositoryDatabase;

  beforeEach(async () => {
    const products: Array<Product> = [
      new Product(1, "A", 1000, 100, 30, 10, 3),
      new Product(2, "B", 5000, 50, 50, 50, 22),
      new Product(3, "C", 30, 10, 10, 10, 0.9),
      new Product(4, "D", 1000, -100, 30, 10, 3),
      new Product(5, "E", 1000, 100, 30, 10, -3),
    ];
    const coupons: Array<Coupon> = [
      new Coupon("VALE20", 20, new Date("2023-10-10T10:00:00")),
      new Coupon("VALE10", 10, new Date("2022-10-10T10:00:00")),
    ];
    productRepository = {
      async get(idProduct: number): Promise<Product> {
        const product = products.find((p) => p.idProduct === idProduct);

        return product as Product;
      },
    };
    couponRepository = {
      async get(code: string): Promise<Coupon> {
        return coupons.find((c) => c.code === code) as Coupon;
      },
    };
    orderRepository = new OrderRepositoryDatabase();
    await orderRepository.clear();
    checkout = new Checkout(
      productRepository,
      couponRepository,
      orderRepository
    );
    getOrder = new GetOrder(orderRepository);
  });

  it(`Não deve criar pedido com cpf inválido`, async () => {
    const input = {
      cpf: "406.302.170-27",
      items: [],
    };

    expect(async () => {
      await checkout.execute(input);
    }).rejects.toThrow("Invalid cpf");
  });

  it("Deve fazer um pedido com três itens", async () => {
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

  it("Deve fazer um pedidos com 3 items e cupom de desconto", async () => {
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

  it("Não deve aplicar um cupom expirado em um checkout", async () => {
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

  it("Não deve aplicar um cupom inexistente em um checkout", async () => {
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

  it("Não deve aceitar item com quantidade menor ou igual a zero", async () => {
    const input = {
      cpf: `198.295.120-61`,
      items: [{ idProduct: 1, quantity: -1 }],
    };

    expect(async () => {
      await checkout.execute(input);
    }).rejects.toThrow("Invalid quantity");
  });

  it("Não deve aceitar item com item duplicado", async () => {
    const input = {
      cpf: `198.295.120-61`,
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 1, quantity: 1 },
      ],
    };

    expect(async () => {
      await checkout.execute(input);
    }).rejects.toThrow("Duplicated item");
  });

  it("Deve fazer um pedido com três itens calculando o frete", async () => {
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
    expect(output.freight).toBe(250);
    expect(output.total).toBe(6250);
  });

  it("Deve fazer um pedido com três itens calculando o frete com preço mínimo", async () => {
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
    expect(output.freight).toBe(280);
    expect(output.total).toBe(6370);
  });

  it("Não deve fazer um pedido de produto com dimensões negativas", async () => {
    const input = {
      cpf: `198.295.120-61`,
      items: [{ idProduct: 4, quantity: 1 }],
      from: "88015600",
      to: "22030060",
    };
    expect(() => checkout.execute(input)).rejects.toThrow(
      new Error("Invalid dimensions")
    );
  });

  it("Não deve fazer um pedido de produto com peso negativo", async () => {
    const input = {
      cpf: `198.295.120-61`,
      items: [{ idProduct: 5, quantity: 1 }],
      from: "88015600",
      to: "22030060",
    };

    expect(async () => {
      await checkout.execute(input);
    }).rejects.toThrow("Invalid weight");
  });

  it("Deve fazer um pedido com três itens e obter o pedido salvo", async () => {
    const idOrder = crypto.randomUUID();
    const input = {
      idOrder,
      cpf: `198.295.120-61`,
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
    };
    await checkout.execute(input);
    const output = await getOrder.execute(idOrder);
    expect(output.total).toBe(6090);
  });

  it("Deve fazer um pedido com três itens e gerar o código do pedido", async () => {
    await checkout.execute({
      idOrder: crypto.randomUUID(),
      cpf: `198.295.120-61`,
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
      email: "john.doe@gmail.com",
      date: new Date("2022-01-01T10:00:00"),
    });
    await checkout.execute({
      idOrder: crypto.randomUUID(),
      cpf: `198.295.120-61`,
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
      email: "john.doe@gmail.com",
      date: new Date("2022-01-01T10:00:00"),
    });
    const idOrder = crypto.randomUUID();
    await checkout.execute({
      idOrder,
      cpf: `198.295.120-61`,
      items: [
        { idProduct: 1, quantity: 1 },
        { idProduct: 2, quantity: 1 },
        { idProduct: 3, quantity: 3 },
      ],
      email: "john.doe@gmail.com",
      date: new Date("2022-01-01T10:00:00"),
    });

    const output = await getOrder.execute(idOrder);
    expect(output.code).toBe("202200000003");
  });
});

import pgPromise from "pg-promise";
import { validate } from "./validate-cpf";

const input: {
  cpf: string;
  items: Array<{
    idProduct: number;
    quantity: number;
  }>;
  from?: string;
  to?: string;
  coupon?: string;
} = {
  cpf: "",
  items: new Array<{
    idProduct: number;
    quantity: number;
  }>(),
  from: undefined,
  to: undefined,
  coupon: undefined,
};

process.stdin.on("data", async (data) => {
  const command = data.toString().replace("/\n/g", "");

  if (command.startsWith("set-cpf")) {
    input.cpf = command.replace("set-cpf", "").trim();
    console.log("CPF definido com sucesso");
    console.log(input);
    return;
  }

  if (command.startsWith("add-item")) {
    const [_, idProduct, quantity] = command.split(" ");

    if (!idProduct || !quantity) {
      console.log("Produto inválido!");
      return;
    }

    input.items.push({
      idProduct: Number(idProduct),
      quantity: Number(quantity),
    });

    console.log("Item adicionado com sucesso");
    console.log(input);
    return;
  }

  if (command.startsWith("checkout")) {
    const connection = pgPromise()(
      "postgres://postgres:postgres@localhost:5432/app"
    );

    try {
      const { cpf, items, coupon, from, to } = input;

      if (!validate(cpf)) {
        console.log("CPF inválido");
        return;
      }

      const output = {
        subtotal: 0,
        freight: 0,
        total: 0,
      };

      for (const item of items) {
        if (item.quantity <= 0) throw new Error("Invalid quantity");
        if (items.filter((i: any) => i.idProduct === item.idProduct).length > 1)
          throw new Error("Duplicated item");
        const [productData] = await connection.query(
          `select * from cccat11.product where id_product = ${item.idProduct}`
        );
        const price = parseFloat(productData.price);
        output.subtotal += price * item.quantity;

        if (from && to) {
          const { width, height, length, weight } = productData;
          if (width <= 0 || height <= 0 || length <= 0)
            throw new Error("Invalid dimensions");
          if (weight <= 0) throw new Error("Invalid weight");
          const volume = ((((width / 100) * height) / 100) * length) / 100;
          const density = parseFloat(weight) / volume;
          let freight = volume * 1000 * (density / 100);
          freight = Math.max(10, freight);
          output.freight += freight * item.quantity;
        }
      }
      output.total = output.subtotal;
      if (coupon) {
        const [couponData] = await connection.query(
          `select * from cccat11.coupon where code = '${coupon}'`
        );
        const today = new Date();
        if (couponData && couponData.expire_date.getTime() >= today.getTime()) {
          output.total -=
            (output.total * parseFloat(couponData.percentage)) / 100;
        }
      }
      output.total += output.freight;
      console.log("Compra realizada com sucesso!", output);
    } catch (error: any) {
      console.log("Erro ao realizar compra!", error.message);
      return;
    } finally {
      await connection.$pool.end();
      process.exit(0);
    }
  }
  console.log("Comando inválido");
});

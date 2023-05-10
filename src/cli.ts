import pgPromise from "pg-promise";
import { validate } from "./validate-cpf";
import Checkout from "./Checkout";

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
    const checkout = new Checkout();
    try {
      const output = await checkout.execute(input);
      console.log(output);
      return;
    } catch (error: any) {
      console.log(error.message);
    }
  }
  console.log("Comando inválido");
});

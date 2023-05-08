import express, { Request, Response } from "express";
import { validate } from "./validate-cpf";
import pgPromise from "pg-promise";

const app = express();
app.use(express.json());

app.post("/checkout", async (req: Request, res: Response) => {
  const connection = pgPromise()(
    "postgres://postgres:postgres@localhost:5432/app"
  );

  try {
    const { cpf, items, coupon, from, to } = req.body;

    if (!validate(cpf)) {
      return res.status(400).json({ message: "Invalid cpf" });
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
    return res.json(output);
  } catch (error: any) {
    return res.status(422).json({ message: error.message });
  } finally {
    await connection.$pool.end();
  }
});

app.listen(3000, () => console.log("Server is running"));

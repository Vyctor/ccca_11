import express, { Request, Response } from "express";
import { validate } from "./validate-cpf";
import pgPromise from "pg-promise";
import Checkout from "./Checkout";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";
import { OrderRepositoryDatabase } from "./OrderRepositoryDatabase";

const app = express();
app.use(express.json());

app.post("/checkout", async (req: Request, res: Response) => {
  const couponRepositoryDatabase = new CouponRepositoryDatabase();
  const productRepositoryDatabase = new ProductRepositoryDatabase();
  const orderRepository = new OrderRepositoryDatabase();
  const checkout = new Checkout(
    productRepositoryDatabase,
    couponRepositoryDatabase,
    orderRepository
  );

  try {
    const output = await checkout.execute(req.body);
    res.status(200).json(output);
  } catch (error: any) {
    res.status(422).json({
      message: error.message,
    });
  }
});

app.listen(3000, () => console.log("Server is running"));

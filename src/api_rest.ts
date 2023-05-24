import express, { Request, Response } from "express";
import Checkout from "./Checkout";
import DatabaseRepositoryFactory from "./DatabaseRepositoryFactory";
import PgPromiseAdapter from "./PgPromiseAdapter";

const app = express();
app.use(express.json());

app.post("/checkout", async function (req: Request, res: Response) {
  const connection = new PgPromiseAdapter();
  const repositoryFactory = new DatabaseRepositoryFactory(connection);
  const checkout = new Checkout(repositoryFactory);

  try {
    const output = await checkout.execute(req.body);
    res.json(output);
  } catch (e: any) {
    res.status(422).json({
      message: e.message,
    });
  }
});

app.listen(3000);

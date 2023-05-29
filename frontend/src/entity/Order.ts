import { v4 as uuid } from "uuid";
import Item from "./Item";
import Product from "./Product";

export default class Order {
  public idOrder: string;
  public cpf: string;
  readonly items: Item[];
  private total: number;

  constructor() {
    this.idOrder = uuid();
    this.cpf = "474.476.790-70";
    this.items = [];
    this.total = 0;
  }

  public addItem(product: Product): void {
    const existingItem = this.items.find(
      (item) => item.idProduct === product.idProduct
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push(new Item(product.idProduct, 1));
    }
    this.total += product.price;
  }

  public getTotal(): number {
    return this.total;
  }
}

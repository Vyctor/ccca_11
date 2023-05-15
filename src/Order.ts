import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import Product from "./Product";

export default class Order {
  private _idOrder: string;
  private _cpf: Cpf;
  private _items: Item[];
  private _code: string;
  private _freight: number;
  private _total: number;
  private _date: Date;
  private _sequence: number;
  private _coupon?: Coupon;

  constructor(
    idOrder: string,
    cpf: string,
    date: Date = new Date(),
    sequence: number
  ) {
    this._idOrder = idOrder;
    this._cpf = new Cpf(cpf);
    this._freight = 0;
    this._total = 0;
    this._items = [];
    this._sequence = sequence;
    this._date = date;
    this._code = `${date.getFullYear()}${new String(sequence + 1).padStart(
      8,
      "0"
    )}`;
  }

  get idOrder() {
    return this._idOrder;
  }

  get cpf() {
    return this._cpf;
  }

  get items() {
    return this._items;
  }

  get code() {
    return this._code;
  }

  get total() {
    let total = this.items.reduce((acc, item) => acc + item.total, 0);

    if (this._coupon) {
      total -= this._coupon.calculateDiscount(total);
    }
    total + this.freight;
    return this.total;
  }

  set total(value: number) {
    this._total = value;
  }

  get freight() {
    return this._freight;
  }

  set freight(value: number) {
    this._freight = value;
  }

  public addItem(product: Product, quantity: number): void {
    const itemExists = this.items.some(
      (item) => item.idProduct === product.idProduct
    );

    if (itemExists) {
      throw new Error("Duplicated item");
    }

    const item = new Item(product.idProduct, product.price, quantity);

    this.items.push(item);
  }

  addCoupon(coupon: Coupon): void {
    if (coupon.isValid(this._date)) {
      this._coupon = coupon;
    }
  }
}

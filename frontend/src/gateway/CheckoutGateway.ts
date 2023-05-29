import Order from "../entity/Order";
import Product from "../entity/Product";

export default interface CheckoutGateway {
  checkout: (order: Order) => Promise<void>;
  getProducts: () => Promise<Product[]>;
}

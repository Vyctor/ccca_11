import Checkout from "./Checkout";
import CsvPresenter from "./CsvPresenter";
import GetProducts from "./GetProducts";
import JsonPresenter from "./JsonPresenter";
import RepositoryFactory from "./RepositoryFactory";

export default class UsecaseFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}
  createCheckout() {
    return new Checkout(this.repositoryFactory);
  }
  createGetProducts(type: string): GetProducts {
    let getProducts;
    if (type === "application/json") {
      getProducts = new GetProducts(
        this.repositoryFactory,
        new JsonPresenter()
      );
    }
    if (type === "text/csv") {
      getProducts = new GetProducts(this.repositoryFactory, new CsvPresenter());
    }
    if (!getProducts) throw new Error("Invalid content-type");

    return getProducts;
  }
}

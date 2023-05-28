import Checkout from "../../application/usecase/Checkout";
import CsvPresenter from "../presenter/CsvPresenter";
import GetProducts from "../../application/usecase/GetProducts";
import JsonPresenter from "../presenter/JsonPresenter";
import RepositoryFactory from "../../application/factory/RepositoryFactory";

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

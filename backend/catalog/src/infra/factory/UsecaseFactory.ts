import CsvPresenter from "../presenter/CsvPresenter";
import JsonPresenter from "../presenter/JsonPresenter";
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import GetProducts from "../../application/usecase/GetProducts";
import GetProduct from "../../application/usecase/GetProduct";

export default class UsecaseFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  createGetProducts(type: string) {
    let getProducts;
    if (type === "text/csv") {
      getProducts = new GetProducts(this.repositoryFactory, new CsvPresenter());
    } else {
      getProducts = new GetProducts(
        this.repositoryFactory,
        new JsonPresenter()
      );
    }
    return getProducts;
  }

  createGetProduct() {
    return new GetProduct(this.repositoryFactory);
  }
}

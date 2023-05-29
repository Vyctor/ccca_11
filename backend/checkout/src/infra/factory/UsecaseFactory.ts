import Checkout from "../../application/usecase/Checkout";
import CsvPresenter from "../presenter/CsvPresenter";
import GetProducts from "../../application/usecase/GetProducts";
import JsonPresenter from "../presenter/JsonPresenter";
import RepositoryFactory from "../../application/factory/RepositoryFactory";
import GatewayFactory from "../../application/factory/GatewayFactory";
import FreightGateway from "../../application/gateway/FreightGateway";

export default class UsecaseFactory {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly gatewayFactory: GatewayFactory,
    private readonly freightGateway: FreightGateway
  ) {}
  createCheckout() {
    return new Checkout(
      this.repositoryFactory,
      this.gatewayFactory,
      this.freightGateway
    );
  }
  createGetProducts(type: string): GetProducts {
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
}

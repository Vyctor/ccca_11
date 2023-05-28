import Presenter from "./Presenter";
import ProductRepository from "./ProductRepository";
import RepositoryFactory from "./RepositoryFactory";

export default class GetProducts {
  private readonly productRepository: ProductRepository;

  constructor(
    repositoryFactory: RepositoryFactory,
    private readonly presenter: Presenter
  ) {
    this.productRepository = repositoryFactory.createProductRepository();
  }

  async execute(): Promise<any> {
    const products = await this.productRepository.list();
    const output = products.map((product) => ({
      idProduct: product.idProduct,
      description: product.description,
      price: product.price,
    }));
    return this.presenter.present(output);
  }
}

type Output = {
  idProduct: number;
  description: string;
  price: number;
};

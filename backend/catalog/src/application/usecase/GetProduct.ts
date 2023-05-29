import Presenter from "../../infra/presenter/Presenter";
import ProductRepository from "../repository/ProductRepository";
import RepositoryFactory from "../factory/RepositoryFactory";

export default class GetProduct {
  private readonly productRepository: ProductRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.productRepository = repositoryFactory.createProductRepository();
  }

  async execute(id: number): Promise<Output> {
    const product = await this.productRepository.get(id);
    return {
      idProduct: product.idProduct,
      description: product.description,
      price: product.price,
      width: product.width,
      height: product.height,
      length: product.length,
      weight: product.weight,
      volume: product.getVolume(),
      density: product.getDensity(),
    };
  }
}

type Output = {
  idProduct: number;
  description: string;
  price: number;
  width: number;
  height: number;
  length: number;
  weight: number;
  volume: number;
  density: number;
};

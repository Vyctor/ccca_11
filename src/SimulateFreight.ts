import FreightCalculator from "./FreightCalculator";
import ProductRepository from "./ProductRepository";
import RepositoryFactory from "./RepositoryFactory";

export default class SimulateFreight {
  private readonly productRepository: ProductRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.productRepository = repositoryFactory.createProductRepository();
  }

  async execute(input: Input): Promise<Output> {
    const output = {
      freight: 0,
    };
    for (const item of input.items) {
      if (input.from && input.to) {
        const product = await this.productRepository.get(item.idProduct);
        const freight = FreightCalculator.calculate(product);
        output.freight += freight * item.quantity;
      }
    }
    return output;
  }
}

type Input = {
  items: { idProduct: number; quantity: number }[];
  from?: string;
  to?: string;
};

type Output = {
  freight: number;
};

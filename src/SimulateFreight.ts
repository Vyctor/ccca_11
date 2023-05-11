import ProductRepository from "./ProductRepository";

export default class SimulateFreight {
  constructor(private readonly _productRepository: ProductRepository) {}
  async execute(input: Input): Promise<Output> {
    const output = {
      freight: 0,
    };

    for (const item of input.items) {
      const productData = await this._productRepository.get(item.idProduct);

      const { width, height, length, weight } = productData;

      if (width <= 0 || height <= 0 || length <= 0) {
        throw new Error("Invalid dimensions");
      }

      if (weight <= 0) {
        throw new Error("Invalid weight");
      }

      const volume = ((((width / 100) * height) / 100) * length) / 100;
      const density = parseFloat(weight) / volume;
      let freight = volume * 1000 * (density / 100);
      freight = Math.max(10, freight);
      output.freight += freight * item.quantity;
    }

    return output;
  }
}

type Input = {
  items: Array<{
    idProduct: number;
    quantity: number;
  }>;
  from: string;
  to: string;
};

type Output = {
  freight: number;
};

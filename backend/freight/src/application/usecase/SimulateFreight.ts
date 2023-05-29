import FreightCalculator from "../../domain/entity/FreightCalculator";
import ProductRepository from "../repository/ProductRepository";
import RepositoryFactory from "../factory/RepositoryFactory";

export default class SimulateFreight {
  constructor() {}

  async execute(input: Input): Promise<Output> {
    const output = {
      freight: 0,
    };
    for (const item of input.items) {
      if (input.from && input.to) {
        const freight = FreightCalculator.calculate({
          distance: 1000,
          volume: item.volume,
          density: item.density,
        });
        output.freight += freight * item.quantity;
      }
    }
    return output;
  }
}

type Input = {
  items: { volume: number; density: number; quantity: number }[];
  from?: string;
  to?: string;
};

type Output = {
  freight: number;
};

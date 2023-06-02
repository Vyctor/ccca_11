import DistanceCalculator from "../../domain/entity/DistanceCalculator";
import FreightCalculator from "../../domain/entity/FreightCalculator";
import RepositoryFactory from "../factory/RepositoryFactory";
import ZipcodeRepository from "../repository/ZipcodeRepository";

export default class SimulateFreight {
  private readonly zipCodeRepository: ZipcodeRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.zipCodeRepository = repositoryFactory.createZipcodeRepository();
  }

  async execute(input: Input): Promise<Output> {
    const output = {
      freight: 0,
    };
    for (const item of input.items) {
      if (input.from && input.to) {
        const from = await this.zipCodeRepository.get(input.from);
        const to = await this.zipCodeRepository.get(input.to);
        let defaultDistance = 1000;

        if (from && to) {
          defaultDistance = DistanceCalculator.calculate(from.coord, to.coord);
        }

        const freight = FreightCalculator.calculate({
          distance: defaultDistance,
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

import SimulateFreight from "../../application/usecase/SimulateFreight";

export default class UsecaseFactory {
  createSimulateFreight() {
    return new SimulateFreight();
  }
}

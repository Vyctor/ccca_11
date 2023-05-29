export default class FreightCalculator {
  static calculate(params: {
    distance: number;
    volume: number;
    density: number;
  }) {
    let freight = params.volume * params.distance * (params.density / 100);
    return Math.max(10, freight);
  }
}

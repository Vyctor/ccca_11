import Coord from "./Coord";
export default class Zipcode {
  coord: Coord;

  constructor(readonly code: string, lat: number, long: number) {
    this.coord = new Coord(lat, long);
  }
}

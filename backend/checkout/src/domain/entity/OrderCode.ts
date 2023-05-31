export default class OrderCode {
  private _value: string;
  constructor(date: Date, sequence: number) {
    this._value = `${date.getFullYear()}${new String(sequence).padStart(
      8,
      "0"
    )}`;
  }

  get value(): string {
    return this._value;
  }
}

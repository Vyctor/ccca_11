import Password from "./Password";

export default class PlainTextPassword implements Password {
  private constructor(readonly value: string) {}

  static create(password: string): Password {
    return new PlainTextPassword(password);
  }
  static restore(password: string): Password {
    return new PlainTextPassword(password);
  }
  public validate(password: string): boolean {
    return password === this.value;
  }
}

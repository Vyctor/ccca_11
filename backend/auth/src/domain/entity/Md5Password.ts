import { createHash } from "crypto";
import Password from "./Password";

export default class Md5Password implements Password {
  private constructor(readonly value: string) {}

  static create(password: string): Password {
    const value = createHash("md5").update(password).digest("hex");
    return new Md5Password(value);
  }

  static restore(password: string): Password {
    return new Md5Password(password);
  }
  public validate(password: string): boolean {
    const value = createHash("md5").update(password).digest("hex");
    return value === this.value;
  }
}

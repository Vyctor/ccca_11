import { createHash } from "crypto";
import Password from "./Password";

export default class Sha1Password implements Password {
  private constructor(readonly value: string) {}

  static create(password: string): Password {
    const value = createHash("sha1").update(password).digest("hex");
    return new Sha1Password(value);
  }

  static restore(password: string): Password {
    return new Sha1Password(password);
  }

  public validate(password: string): boolean {
    const value = createHash("sha1").update(password).digest("hex");
    return this.value === value;
  }
}

import { pbkdf2Sync, randomBytes, createHash } from "crypto";
import Password from "./Password";

export default class Pbkdf2Password implements Password {
  private constructor(readonly value: string, readonly salt: string) {}

  static create(password: string): Password {
    const salt = randomBytes(20).toString("hex");
    const value = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString(
      "hex"
    );
    return new Pbkdf2Password(value, salt);
  }

  static restore(password: string, salt: string): Password {
    return new Pbkdf2Password(password, salt);
  }

  public validate(password: string): boolean {
    const value = pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString(
      "hex"
    );
    return this.value === value;
  }
}

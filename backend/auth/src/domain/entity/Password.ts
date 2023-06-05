import { pbkdf2Sync, randomBytes } from "crypto";

export default class Password {
  private constructor(readonly value: string, readonly salt: string) {}

  static create(password: string): Password {
    const salt = randomBytes(20).toString("hex");
    const value = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString(
      "hex"
    );

    return new Password(value, salt);
  }

  static restore(password: string, salt: string): Password {
    return new Password(password, salt);
  }

  public validate(password: string) {
    const value = pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString(
      "hex"
    );
    return this.value === value;
  }
}

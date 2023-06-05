import Email from "./Email";
import Password from "./Password";
import PasswordFactory from "./PasswordFactory";
import Pbkdf2Password from "./Pbkdf2Password";

export default class User {
  private constructor(
    public email: Email,
    public password: Password,
    readonly passwordType: string
  ) {}

  // static factory method
  static create(email: string, password: string, passwordType: string): User {
    const pass = PasswordFactory.create(passwordType, password);
    return new User(new Email(email), pass, passwordType);
  }

  static restore(
    email: string,
    hash: string,
    salt: string,
    passwordType: string
  ): User {
    const password = PasswordFactory.restore(passwordType, hash, salt);
    return new User(new Email(email), password, passwordType);
  }

  public updatePassword(password: string): void {
    this.password = Pbkdf2Password.create(password);
  }

  public validatePassword(password: string): boolean {
    return this.password.validate(password);
  }
}

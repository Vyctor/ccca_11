import Email from "./Email";
import Password from "./Password";

export default class User {
  public email: Email;

  private constructor(email: string, public password: Password) {
    this.email = new Email(email);
  }

  // static factory method
  static create(email: string, password: string): User {
    return new User(email, Password.create(password));
  }

  static restore(email: string, hash: string, salt: string): User {
    return new User(email, Password.restore(hash, salt));
  }

  public updatePassword(password: string): void {
    this.password = Password.create(password);
  }

  public validatePassword(password: string): boolean {
    return this.password.validate(password);
  }
}

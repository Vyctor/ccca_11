import Md5Password from "./Md5Password";
import Password from "./Password";
import Pbkdf2Password from "./Pbkdf2Password";
import PlainTextPassword from "./PlainTextPassword";
import Sha1Password from "./Sha1Password";

export default class PasswordFactory {
  static create(type: string, password: string): Password {
    switch (type) {
      case "pbkdf2":
        return Pbkdf2Password.create(password);
      case "sha1":
        return Sha1Password.create(password);
      case "md5":
        return Md5Password.create(password);
      case "plain":
        return PlainTextPassword.create(password);
      default:
        throw new Error(`Unknown password type: ${type}`);
    }
  }
  static restore(type: string, password: string, salt: string): Password {
    switch (type) {
      case "pbkdf2":
        return Pbkdf2Password.restore(password, salt);
      case "sha1":
        return Sha1Password.restore(password);
      case "md5":
        return Md5Password.restore(password);
      case "plain":
        return PlainTextPassword.restore(password);
      default:
        throw new Error(`Unknown password type: ${type}`);
    }
  }
}

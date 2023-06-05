import { sign } from "jsonwebtoken";
import User from "./User";

export default class TokenGenerator {
  private readonly EXPIRES_IN = "1h";
  private readonly SECRET = "1h";

  sign(user: User, date: Date) {
    return sign(
      Object.assign({
        email: user.email.value,
        iat: date.getTime(),
      }),
      this.SECRET,
      { expiresIn: this.EXPIRES_IN }
    );
  }
}

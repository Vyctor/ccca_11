import UserRepository from "../../application/repository/UserRepository";
import User from "../../domain/entity/User";
import DatabaseConnection from "../database/DatabaseConnection";

export default class UserRepositoryDatabase implements UserRepository {
  constructor(private readonly connection: DatabaseConnection) {}

  async save(user: User): Promise<void> {
    await this.connection.query(
      "INSERT INTO cccat11.user (email, password, salt, password_type) VALUES ($1, $2, $3, $4)",
      [
        user.email.value,
        user.password.value,
        user.password.salt,
        user.passwordType,
      ]
    );
  }
  async get(email: string): Promise<User | undefined> {
    const [data] = await this.connection.query(
      "SELECT * FROM cccat11.user WHERE email = $1",
      [email]
    );
    if (!data) return;
    return User.restore(
      data.email,
      data.password,
      data.salt,
      data.password_type
    );
  }
  async update(user: User): Promise<void> {
    await this.connection.query(
      "UPDATE cccat11.user SET password = $1, salt = $2 WHERE email = $3",
      [user.password.value, user.password.salt, user.email.value]
    );
  }

  async delete(email: string): Promise<void> {
    await this.connection.query("DELETE FROM cccat11.user WHERE email = $1", [
      email,
    ]);
  }
}

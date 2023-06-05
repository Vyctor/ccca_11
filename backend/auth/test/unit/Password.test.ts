import Md5Password from "../../src/domain/entity/Md5Password";
import Pbkdf2Password from "../../src/domain/entity/Pbkdf2Password";
import PlainTextPassword from "../../src/domain/entity/PlainTextPassword";
import Sha1Password from "../../src/domain/entity/Sha1Password";

describe("Password unit test", () => {
  it("Deve criar uma senha usando pbkdf2", async () => {
    const password = Pbkdf2Password.create("abc123");
    expect(password.validate("abc123")).toBe(true);
  });

  it("Deve criar uma senha usando plain text", async () => {
    const password = PlainTextPassword.create("abc123");
    expect(password.validate("abc123")).toBe(true);
  });

  it("Deve criar uma senha usando md5", async () => {
    const password = Md5Password.create("abc123");
    expect(password.validate("abc123")).toBe(true);
  });

  it("Deve criar uma senha usando Sha1", async () => {
    const password = Sha1Password.create("abc123");
    expect(password.validate("abc123")).toBe(true);
  });
});

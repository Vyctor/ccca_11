import TokenGenerator from "../../src/domain/entity/TokenGenerator";
import User from "../../src/domain/entity/User";

test("Deve assinar um token", async () => {
  const tokenGenerator = new TokenGenerator();
  const user = User.create("dev.vyctor@gmail.com", "123456", "pbkdf2");
  const date = new Date("2021-02-01");
  const signToken = tokenGenerator.sign(user, date);
  expect(signToken).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi52eWN0b3JAZ21haWwuY29tIiwiaWF0IjoxNjEyMTM3NjAwMDAwLCJleHAiOjE2MTIxMzc2MDM2MDB9.Ca6BB_78S3oZ1y0j4h-T0iEje9kb_mDWHBfxOAXe-zs"
  );
});

test("Deve verificar um token", async () => {
  const tokenGenerator = new TokenGenerator();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldi52eWN0b3JAZ21haWwuY29tIiwiaWF0IjoxNjEyMTM3NjAwMDAwLCJleHAiOjE2MTIxMzc2MDM2MDB9.Ca6BB_78S3oZ1y0j4h-T0iEje9kb_mDWHBfxOAXe-zs";

  const verifyToken = tokenGenerator.verify(token);
  expect(verifyToken.email).toBe("dev.vyctor@gmail.com");
});

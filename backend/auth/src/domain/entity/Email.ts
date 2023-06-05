export default class Email {
  value: string;

  constructor(private readonly email: string) {
    if (!this.isValid(email)) throw new Error("Invalid email");
    this.value = email;
  }

  private isValid(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/
      );
  }
}

import { connect } from "amqplib";
import Checkout from "./Checkout";

export async function main() {
  const opt = {
    credentials: require("amqplib").credentials.plain("rabbitmq", "rabbitmq"),
  };
  const connection = await connect("amqp://localhost", opt);
  const channel = await connection.createChannel();
  channel.assertQueue("checkout", { durable: true });
  channel.consume("checkout", async (message) => {
    if (message) {
      const input = JSON.parse(message.content.toString());

      try {
        const checkout = new Checkout();
        const output = await checkout.execute(input);
        console.log(output);
        channel.ack(message);
      } catch (error: any) {
        console.log(error.message);
      }
    }
  });
}

main();

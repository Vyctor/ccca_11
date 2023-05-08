import { connect } from "amqplib";

export async function main() {
  const opt = {
    credentials: require("amqplib").credentials.plain("rabbitmq", "rabbitmq"),
  };
  const connection = await connect("amqp://localhost", opt);
  const channel = await connection.createChannel();
  channel.assertQueue("checkout", { durable: true });
  channel.consume("checkout", (message) => {
    if (message) {
      console.log(JSON.parse(message?.content.toString()));
      channel.ack(message);
    }
  });
}

main();

import { connect } from "amqplib";

export async function main() {
  const opt = {
    credentials: require("amqplib").credentials.plain("rabbitmq", "rabbitmq"),
  };
  const connection = await connect("amqp://localhost", opt);
  const channel = await connection.createChannel();
  channel.assertQueue("checkout", { durable: true });
  const input = {
    cpf: `198.295.120-61`,
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  };
  channel.sendToQueue("checkout", Buffer.from(JSON.stringify(input)));
}

main();

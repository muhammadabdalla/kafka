const { Kafka, Partitioners } = require("kafkajs");

run();

async function run() {
  try {
    const kafkaa = new Kafka({
      clientId: "myapp",
      brokers: ["localhost:9092"],
    });

    const consumer = kafkaa.consumer({ groupId: "test" });

    console.log("connecting...");

    await consumer.connect();

    console.log("connected");

    await consumer.subscribe({
      topic: "Users",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `RVD Msg ${result.message.value} on partition  ${result.partition}`
        );
      },
    });
  } catch (err) {
    console.log(` some thin g bad happend${err}`);
  }
}

const { Kafka, Partitioners } = require("kafkajs");
const msg = process.argv[2];

run();

async function run() {
  try {
    const kafkaa = new Kafka({
      clientId: "myapp",
      brokers: ["localhost:9092"],
    });

    const producer = kafkaa.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });

    console.log("connecting...");

    await producer.connect();

    console.log("connected");

    const partition = msg[0] < "N" ? 0 : 1;

    const result = await producer.send({
      topic: "Users",
      messages: [
        {
          value: msg,
          partition,
        },
      ],
    });

    console.log(`sent successfully! ${JSON.stringify(result)}`);

    await producer.disconnect();
  } catch (err) {
    console.log(` some thin g bad happend${err}`);
  } finally {
    process.exit(0);
  }
}

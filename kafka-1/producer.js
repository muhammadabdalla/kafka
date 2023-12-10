const { Kafka, Partitioners } = require("kafkajs");
const Chance = require("chance");
const chance = new Chance();

const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["localhost:9092", "localhost:9093", "localhost:9094"],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});
const topic = "animals";

const produceMesaage = async () => {
  const value = chance.animal();
  console.log(value);
  try {
    await producer.send({
      topic,
      messages: [{ value }],
    });
  } catch (err) {
    console.log(err);
  }
};

const run = async () => {
  // Producing
  await producer.connect();
  setInterval(produceMesaage, 1000);
};
run().catch(console.error);

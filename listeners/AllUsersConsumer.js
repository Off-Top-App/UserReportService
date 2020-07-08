const kafka = require('kafka-node');
// const bp = require('body-parser');
const config = require('./config');

try {
  const Consumer = kafka.Consumer;
  const client = new kafka.KafkaClient(config.kafka_server);
  let consumer = new Consumer(
    client,
    [{
      topic: "AllUserDataResponse",
      partition: 0
    }], {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf-8',
      fromOffset: false
    }
  );

  consumer.on('message', async function(message) {
    console.log('kafka -> CONSUMED:  ', message.value);
  });
}

catch (e) {
  console.log(e);
}

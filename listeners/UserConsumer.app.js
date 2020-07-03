const kafka = require('kafka-node');
// const bp = require('body-parser');
const config = require('./config');

try {
  const Consumer = kafka.Consumer;
  const client = new kafka.KafkaClient(config.kafka_server);
  let consumer = new Consumer(
    client,
    [{
      topic: config.kafka_topic,
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
    //call userSession to get session data for all users HERE
    //userSession Microservice will join session and user userDataResponse
    //will send back all user session's data in an [{}, {}, {}]
    //and must send this data into a nosql db i must create
  });
}

catch (e) {
  console.log(e);
}

const kafka = require('kafka-node');
// const bp = require('body-parser');
const config = require('./config');


try {
  const Producer = kafka.Producer;
  const client = new kafka.KafkaClient(config.kafka_server);
  // const client = new kafka.KafkaClient({kafkaHost: config.kafka_server});
  const producer = new Producer(client);
  const kafka_topic = 'requestUserData';
  console.log('TOPIC: ' + kafka_topic);

  let payloads = [{
    topic: kafka_topic,
    messages: JSON.stringify({user_id: 1})
  }];

  producer.on('ready', async function() {
    let push_status = producer.send(payloads, function(err, data) {
      if (err) {
        console.log('[kafka-producer -> ' + kafka_topic + ']: broker update failed');
      } else {
        console.log('[kafka-producer -> ' + kafka_topic + ']: broker update success');
      }
    });
  });

  producer.on('error', function(err) {
    console.log(err);
    console.log('[kafka-producer -> ' + kafka_topic + ']:  connection error');
    throw err;
  });
}

catch (e) {
  console.log(e);
}

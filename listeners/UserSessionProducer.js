const kafka = require('kafka-node');
const config = require('./config');

try {
  const Producer = kafka.Producer;
  const client = new kafka.KafkaClient(config.kafka_server);

  const producer = new producer(client);
  const kafka_topic = 'some-topic';
  console.log('TOPIC: ' + kafka_topic);

  let payloads = [{
    topic: kafka_topic,
    messages: JSON.stringify({user_id: 1})
  }];

  producer.on('ready', async function(){
    let push_status = producer.send(payloads, function(err, data){
      if(err){
        console.log('[kafka-producer -> ' + kafka_topic + ']: BROKER UPDATE FAILED');
      } else {
        console.log('[kafka-producer -> ' + kafka_topic + ']: BROKER UPDATE SUCCESS');
      }
    });
  });

  producer.on('error', function(err){
    console.log(err);
    console.log('[kafka-producer -> + ' kafka_topic + ']: CONNECTION ERROR');
    throw err;
  });
}
catch(e){
  console.log(e);
}

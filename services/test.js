const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
let url = 'mongodb+srv://off-top-dev:offtop123@cluster0-ci5ku.gcp.mongodb.net/off-top-db';


MongoClient.connect(url, function(err, db){
  if(err){
    throw err;
  }
  let dbo = db.db('UserReports');
  let testObject = {
    user_id: 2,
    user_profession: 'Social Worker',
    gender: 'female',
    city: 'San Jose',
    state: 'CA',
    age: 30,
    session_duration: ['2 min', '25 min', '84 min'],
    session_data:
    [
      {
      id: 'index',
      user_id: "session['user_id']",
      first_received_at: "session['first_received_at']",
      topic: "session['topic']",
      focus_score: "session['focus_score']",
      transcribed_at: "session['transcribed_at']",
      transcribed_speech: "session['transcribed_speech']"
      }
    ]
  }
  dbo.collection('user_reports').insertOne(testObject, function(err, res){
    if(err){
      throw err;
    }
    else{
      console.log('Object successfully added to user_reports collection');
      db.close();
    }
  });
});

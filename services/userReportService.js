//class used to migrate userServices.py
//must migrate 6 functions

function userSesstionDuration(){
  let sessions = []; //will get data from message queue
  let allSessions = JSON.parse(sessions).sessions;
  let userIds = [1, 2, 3, 4, 5, 6];
  //userIds must now be dynamic
  let userTimeList = [];
  let userSessionDurationList = [];

  userIds.forEach(function(UserId){
    let userTranscribedCounter = 0;
    let transcribedList = [];

    allSessions.forEach(function(session){
      //CHECK THIS!!
      let sessionUserId = parseInt(session['user_id'], 10);

      if(userId === sessionUserId){
        //FIND WAY TO CHANGE THE session['transcribed_at'] INTO A STRING
        let time = 'something';
        transcribedList.push(time.toString());
        userTranscribedCounter++;
      }
    });


    let userTime = {
      user_id: userId,
      first_transcribed_at: 0,
      last_transcribed_at: userTranscribedCounter,
      transcribed_list: transcribedList.sort(function(a, b){return a-b});
    }
    userTimeList.push(userTime);
  });

  userTimeList.forEach(function(user){
    //MAKE SURE THESE ARE BEING USED CORRECTLY
    let first = user['first_transcribed_at'];
    let last = user['last_transcribed_at'];
    let transcribedArray = user['transcribed_list'];

    //FIND WAY TO FIND A DURATION FROM user['last_transcribed_at'] - user['first_transcribed_at']
    //FORMAT IN HOUR: MIN: SECOND
    let lastTime = 'something';
    let firstTime = 'something';

    let t1 = 'something';
    let t2 = 'something';

    let duration = t2-t1;

    let userSessionDuration = {
      user_id: user['user_id'],
      session_duration: duration.toString();
    }
    userSessionDurationList.push(userSessionDuration);
  });
  return JSON.parse(userSessionDurationList);

}

function userAverageFocusScore(){
  let sessions = [];
  let allSessions = [];
  let userIds = [1, 2, 3, 4, 5, 6];
  let userScoreList = [];
  let summedScore = 0;
  let userSessionCount = 0;

  userIds.forEach(function(userId){
    allSessions.forEach(function(session){
      let sessionUserId = parseInt(session['user_id']);
      if(userId === sessionUserId){
        userSessionCount++;
        if(session['focus_score'] === true){
          summedScore++;
        }
      }
    });
    let avgScore = 10 * (summedScore / userSessionCount);
    summedScore = 0;
    userSessionCount = 0;

    let userAverageScore = {
      user_id: userId,
      avg_focus_score: avgScore
    }
    userScoreList.push(userAverageScore);

    if(userAverageScore.includes(userScoreList) === false){
      userScoreList.push(userAverageScore);
    }

    let userScoreLists = {
      avgScore: userScoreList
    }

    return JSON.parse(userScoreList);
  });
}

function insertUser(){
  //
}

function retrieveUser(){
  let cur = mysql.connection.cursor(); //find node alternative
  cur.execute('SELECT * FROM user');
  let fetchData = cur.fetchall();
  cur.close();

  let users = [];

  fetchData.forEach(function(row){
    let userInfo = {
      user_id: row[0],
      age: row[1],
      city: row[2],
      first_name: row[6],
      last_name: row[8],
      email: row[5],
      gender: row[7],
      user_name: row[11],
      password: row[9],
      professional: row[10],
      created_at: row[3],
      deleted_at: row[4]
    }
    users.push(userInfo);
    let allUsers = {
      Users: users
    }
  });
  return JSON.parse(allUsers);
}

function mergeUserData(){
  let users = retrieveUser();
  let getUsers = users.sessions;
  let sessions = 'someMethod';
  let allSessions = sessions.sessions;
  let userInfoSessionList = [];

  getUsers.forEach(function(users){
    let userList = {
      user_id: user['user_id'],
      first_name: user['first_name'],
      last_name: user['last_name'],
      gender: user['gender'],
      profession: user['professional'] //professional?
    }

    let userId = parseInt(user['user_id']);
    let sessionList = [];

    sessionList.forEach(function(session){
      let sessionUserId = parseInt(session['user_id']);
      if(userId === sessionUserId){
        let sessionObject = {
          first_received_at: session['first_received_at'],
          topic: session['topic'],
          focus_score: session['focus_score'],
          transcribed_at: session['transcribed_at'],
          transcribed_speech: session['transcribed_speech']
        }
      }
      sessionList.push(sessionObject);
      userList['session'] = sessionList;

      if(userInfoSessionList.includes(userId) === false){
        userInfoSessionList.push(userList);
      }
    });
  });
  return JSON.parse(userInfoSessionList);
}

// function aggregateUserTopics(){
//   let sessions = [];
//   let allSessions = [];
//   let userIds = [1, 2, 3, 4, 5, 6];
//   let userTopicList = [];
//
//   userIds.forEach(function(userId){
//     allSessions.forEach(function(session){
//       let sessionUserId = parseInt(session['user_id'], 10);
//
//       if(userId === sessionUserId){
//
//         let userTopic = {
//           userId: sessionUserId,
//           topic: session['topic']
//         }
//       }
//       if(userTopicList.includes(userTopic) === false){
//         userTopicList.push(userTopic);
//       }
//     });
//   });
//   return JSON.parse(userTopicList);
// }

// function getProfession(){
//   let users = 'someUser';
//   let getUsers = 'users.somethings';
//   let userAverageScore = userAverageFocusScore();
//   let scores = userAverageScore.avgScore;
//   let professionList = [];
//
//   getUsers.forEach(function(user){
//     scores.forEach(function(score){
//       let userId = parseInt(user['user_id']);
//       let scoreFromAvgFocusScore = parseInt(score['user_id']);
//
//       if(userId === scoreFromAvgFocusScore){
//
//         let professionObject = {
//           user_id: score['user_id'],
//           avg_focus_score: score['avg_focus_score'],
//           profession: user['profession']
//         }
//
//         professionList.push(professionObject);
//
//         let professionWithScore = {
//           profession_with_score: professionList
//         }
//       }
//     });
//   });
//   return JSON.parse(professionWithScore);
// }

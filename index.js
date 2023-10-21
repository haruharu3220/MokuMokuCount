const { App } = require('@slack/bolt');
const store = require('./store');
let userCount = {};
var date = new Date() ;
let sayFlag = true;


const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});


// // "hello" を含むメッセージをリッスンします
//https://api.slack.com/events/message
app.message(/(もく|モク|moku|もくもく|モクモク|mokumoku)/, async ({ message, context, say }) => {
  let dateTime = new Date(message.ts * 1000,{
    timezone:"Asia/Tokyo"
  });
  let user = await store.getUser(message.user);
  // let user = true;
  
  if (!user) {
    user = {
      user: message.user,
      date: dateTime,
      totalCount: 1,
      consecutiveCount: 1,
      maxConsecutiveCount: 1,
    };
    say("start３");
    store.addUser(user);
    // say("A");
  }else{
    // async() =>{
      let options = {};
      // options = await store.getUser(message.user);
      // const name = JSON.stringify(options.user);
//       if(true){
        // say(name);
        say(user.user);
        say(user.date);
        say(dateTime.toString());
        say(user.totalCount.toString());
        say(user.consecutiveCount.toString());
        say(user.maxConsecutiveCount.toString());
    
//         // say(options);
//         // say(JSON.stringify(options.user));
//         // say(JSON.stringify(options));

//       // say([options.user]);
//       // say(hello);
//       say("a");
//     }

    // let _totalCount = store.getUser(message.user).totalCount;
    let _totalCount =　await user.totalCount;
    if(_totalCount){
    }
    let _consecutiveCount = 0;
    let _maxConsecutiveCount = await user.consecutiveCount;
    let diffDate = await (dateTime-user.date)/ 86400000;

    if(dateTime.getFullYear() == user.date.getFullYear() &&
       dateTime.getMonth() == user.date.getMonth() &&
       dateTime.getDate() == user.date.getDate()){
      // デバッグのためコメントアウト
      // sayFlag = false;
      _totalCount++;  
    }else{
       _totalCount++;  
    }
    say("E");
    if(diffDate > 2) {
      _consecutiveCount = 0;
    }else{
      _consecutiveCount = user.consecutiveCount;
      _consecutiveCount++;
    }
     say("F");
    if(_consecutiveCount>user.maxConsecutiveCount){
      _maxConsecutiveCount = user.maxConsecutiveCount;
      _maxConsecutiveCount++;
    }
    user = {
      user: message.user,
      date: dateTime,
      totalCount: _totalCount,
      consecutiveCount: _consecutiveCount,
      maxConsecutiveCount: _maxConsecutiveCount,
    };
     say("G");
    store.updateUser(user);
     say("H");
    // say("B"+ diffDate.toString());
  }
  
  if(sayFlag){
  // イベントがトリガーされたチャンネルに say() でメッセージを送信します
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `<${message.user}>さん、お疲れ様！\nあなたがG'sに入学してからモクモクした日数は通算${user.totalCount.toString()} 日だよ！\n今日で連続${user.consecutiveCount.toString()} 日モクモクしているよ！\n連続モクモク日数の最高記録は${user.maxConsecutiveCount.toString()}日だよ！`,
        },
        // "accessory": {
        //   "type": "button",
        //   "text": {
        //     "type": "plain_text",
        //     "text": "Click Me"
        //   },
        //   "action_id": "button_click"
        // }
      }
    ],
    text: `Hey there <@${context.user}>! :smile`
  });
  }
  
  });


(async () => {
  // アプリを起動します
  await app.start();
  console.log('⚡️ Bolt app is running!');
})();


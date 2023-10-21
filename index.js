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
  say("start");
  let dateTime = new Date(message.ts * 1000);
  let user = store.getUser(message.user);
  
  if (!user) {
    user = {
      user: message.user,
      date: dateTime,
      totalCount: 1,
      consecutiveCount: 1,
      maxConsecutiveCount: 1,
    };
    
    // ★store.addUser(user);
    // say("A");
  }else{
    let _totalCount = store.getUser(message.user).totalCount;
    let _consecutiveCount = 0;
    let _maxConsecutiveCount = store.getUser(message.user).maxConsecutiveCount;
    let diffDate = (dateTime-store.getUser(message.user).date)/ 86400000;

    if(dateTime.getFullYear() == store.getUser(message.user).date.getFullYear() &&
       dateTime.getMonth() == store.getUser(message.user).date.getMonth() &&
       dateTime.getDate() == store.getUser(message.user).date.getDate()){
      // デバッグのためコメントアウト
      // sayFlag = false;
      _totalCount++;  
    }else{
       _totalCount++;  
    }
    
    if(diffDate > 2) {
      _consecutiveCount = 0;
    }else{
      _consecutiveCount = store.getUser(message.user).consecutiveCount;
      _consecutiveCount++;
    }
    
    if(_consecutiveCount>store.getUser(message.user).maxConsecutiveCount){
      _maxConsecutiveCount = store.getUser(message.user).maxConsecutiveCount;
      _maxConsecutiveCount++;
    }
    user = {
      user: message.user,
      date: dateTime,
      totalCount: _totalCount,
      consecutiveCount: _consecutiveCount,
      maxConsecutiveCount: _maxConsecutiveCount,
    };
    
    store.updateUser(user);
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
          "text": `<@${message.user}>さん、お疲れ様！\nあなたがG'sに入学してからモクモクした日数は通算${store.getUser(message.user).totalCount} 日だよ！\n今日で連続${store.getUser(message.user).consecutiveCount} 日モクモクしているよ！\n連続モクモク日数の最高記録は${store.getUser(message.user).maxConsecutiveCount}日だよ！`,
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


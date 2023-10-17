const { App } = require('@slack/bolt');
const store = require('./store');
let userCount = {};
var date = new Date() ;

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,

});


// const { App } = require('@slack/bolt');

// const app = new App({
//   token: process.env.SLACK_BOT_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   socketMode: true,
//   appToken: process.env.SLACK_APP_TOKEN,
//   // ソケットモードではポートをリッスンしませんが、アプリを OAuth フローに対応させる場合、
//   // 何らかのポートをリッスンする必要があります
//   port: process.env.PORT || 3000
// });

// // "hello" を含むメッセージをリッスンします
//https://api.slack.com/events/message
app.message(/(もく|モク|moku|もくもく|モクモク|mokumoku)/, async ({ message, context, say }) => {

  let dateTime = new Date(message.ts * 1000).toLocaleDateString();

  let user = store.getUser(message.user);
  
  
  if (!user) {
    user = {
      user: message.user,
      date: dateTime,
      totalCount: 1,
      consecutiveCount: 1,
      maxConsecutiveCount: 1,
    };
    

    store.addUser(user);
    // say("A");
  }else{
    let consecutiveCount = 0;
    
    if(dateTime-store.getUser(message.user).date>1) consecutiveCount =0;
    
    user = {
      user: message.user,
      date: dateTime,
      totalCount: 1,
      consecutiveCount: 1,
      maxConsecutiveCount: 1,
    };
    
    store.updateUser(message);
    // say("B");
  }
  
  // イベントがトリガーされたチャンネルに say() でメッセージを送信します
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          // "text": `Hey there <${message.user}>\n${message.type}\n${message.channel}\n${message.text}\n${message.ts}\n${store.getUserCount(message.user)} `,
          "text": `${store.getUser(message.user).date}\n<@${message.user}>さん、お疲れ様！\nあなたがG'sに入学してからモクモクした回数は通算${store.getUser(message.user).totalCount} 日だよ:smile:\n今日で連続${store.getUser(message.user).consecutiveCount} 日モクモクしているよ:smile:\n連続日数の最高記録は${store.getUser(message.user).maxConsecutiveCount}日だよ！`,
          
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `Hey there <@${context.user}>! :smile`
  });
});

(async () => {
  // アプリを起動します
  await app.start();
  console.log('⚡️ Bolt app is running!');
})();


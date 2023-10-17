const { App } = require('@slack/bolt');
const store = require('./store');
let userCount = {};
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,

});


app.event('app_mention', async ({ event, say }) => {
  // Look up the user from DB
  let user = store.getUser(event.user);
  // if (user) {
    user = {
      user: event.user,
      channel: event.channel,
      // count: 1
    };
    store.addUser(user);
    await say(`Hello world, and welcome <@${event.user}><${event.ts}><${event.text}>`);
  // } else {
  //   await say('Hi again!');
  // }
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
app.message('もくもく', async ({ message, say }) => {
  let user = store.getUser(message.user);
  if (!user) {
    user = {
      user: message.user,
      // count: 1,
    };
    
    userCount = {
      user: message.user,
      totalCount: 1,
      consecutiveCount: 1,
      maxconsecutiveCount: 1,
    };
    
    store.addUser(user);
    store.addUserCount(userCount);
    
    // say("A");
  }else{
    store.updateUserCount(message.user);
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
          "text": `<@${message.user}>さん、お疲れ様！\nあなたがG'sに入学してからモクモクした回数は通算${store.getUserCount(message.user).totalCount} 回だよ:smile:\n${message.ts.toLocaleDateString()}`,
          
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
    text: `Hey there <@${message.user}>! :smile`
  });
});

// app.action('button_click', async ({ body, ack, say }) => {
//   // アクションのリクエストを確認
//   await ack();
//   await say(`<@${body.user.id}> clicked the button`);
// });

// (async () => {
//   // アプリを起動します
//   await app.start();

//   console.log('⚡️ Bolt app is running!');
// })();




// const { App } = require('@slack/bolt');

// const app = new App({
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   token: process.env.SLACK_BOT_TOKEN,
//   socketMode: true,
//   appToken: process.env.SLACK_APP_TOKEN,
//   // ソケットモードではポートをリッスンしませんが、アプリを OAuth フローに対応させる場合、
//   // 何らかのポートをリッスンする必要があります
//   port: process.env.PORT || 3000
// });

// // "hello" を含むメッセージをリッスンします
// app.message('hello', async ({ message, say }) => {
//   // イベントがトリガーされたチャンネルに say() でメッセージを送信します
//   await say(`Hey there <@${message.user}>!`);
// });

(async () => {
  // アプリを起動します
  await app.start();

  console.log('⚡️ Bolt app is running!');
})();



// const { App } = require('@slack/bolt');

// // ボットトークンとソケットモードハンドラーを使ってアプリを初期化します
// const app = new App({
//   token: process.env.SLACK_BOT_TOKEN,
//   signingSecret: process.env.SLACK_SIGNING_SECRET
// });

// (async () => {
//   // アプリを起動します
//   await app.start(process.env.PORT || 3000);

//   console.log('⚡️ Bolt app is running!');
// })();
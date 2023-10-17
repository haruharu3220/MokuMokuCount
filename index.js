// const { App } = require('@slack/bolt');
// const store = require('./store');

// const app = new App({
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   token: process.env.SLACK_BOT_TOKEN,
//   // socketMode: true,

// });


// app.event('app_mention', async ({ event, say }) => {
//   // Look up the user from DB
//   let user = store.getUser(event.user);
//   // if (user) {
//     user = {
//       user: event.user,
//       channel: event.channel,
//       // count: 1
//     };
//     store.addUser(user);
//     await say(`Hello world, and welcome <@${event.user}>`);
//   // } else {
//   //   await say('Hi again!');
//   // }
// });

// app.message('もくもく',async({message,say})=>{
//   await say(`もくもくっていったね`);
// });


// // Start your app
// (async () => {
//   await app.start(process.env.PORT || 3000);
//   console.log('⚡️ Bolt app is running!');
// })();






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
// app.message('hello', async ({ message, say }) => {
//   // イベントがトリガーされたチャンネルに say() でメッセージを送信します
//   await say({
//     blocks: [
//       {
//         "type": "section",
//         "text": {
//           "type": "mrkdwn",
//           "text": `Hey there <@${message.user}>!`
//         },
//         "accessory": {
//           "type": "button",
//           "text": {
//             "type": "plain_text",
//             "text": "Click Me"
//           },
//           "action_id": "button_click"
//         }
//       }
//     ],
//     text: `Hey there <@${message.user}>!`
//   });
// });

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




const { App } = require('@slack/bolt');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  // ソケットモードではポートをリッスンしませんが、アプリを OAuth フローに対応させる場合、
  // 何らかのポートをリッスンする必要があります
  port: process.env.PORT || 3000
});

// "hello" を含むメッセージをリッスンします
app.message('hello', async ({ message, say }) => {
  // イベントがトリガーされたチャンネルに say() でメッセージを送信します
  await say(`Hey there <@${message.user}>!`);
});

(async () => {
  // アプリを起動します
  await app.start();

  console.log('⚡️ Bolt app is running!');
})();
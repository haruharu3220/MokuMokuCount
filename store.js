// // This is not a real datastore, but it can be if you make it one :)

// // let messages = {};
// let users = {};
// // let me = undefined;
// // let defaultChannel = undefined;

// // exports.getMessages = () => {
// //   return messages;
// // };

// exports.addUser = (user) => {
//   users[user.user] = user;
//   users[user.user].date = user.date;
//   users[user.user].totalCount = user.totalCount;
//   users[user.user].consecutiveCount= user.consecutiveCount;
//   users[user.user].maxConsecutiveCount = user.maxConsecutiveCount;
// };

// exports.getUser = (id) => {
//   return users[id];
// };

// exports.updateUser = (user) =>{
//   users[user.user].date = user.date;
//   users[user.user].totalCount =user.totalCount;
//   users[user.user].consecutiveCount =user.consecutiveCount;
//   users[user.user].maxConsecutiveCount =user.maxConsecutiveCount;
// }


// // exports.setChannel = (channel) => {
// //   defaultChannel = channel;
// // };

// // exports.getChannel = () => {
// //   return defaultChannel;
// // };

// // exports.setMe = (id) => {
// //   me = id;
// // };

// // exports.getMe = () => {
// //   return me;
// // };

// // exports.getCount = (id) => {
// //   return 
// // }

// Utilities we need
const fs = require("fs");

// Initialize the database
const dbFile = "./.data/choices.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
let db;

db.serialize(function() {
  db.run("CREATE TABLE users (user TEXT, date TEXT, totalCount INTEGER, consecutiveCount INTEGER, maxConsecutiveCount INTEGER)");

  let stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?)");
  exports.addUser = (user) => {
    stmt.run(user.user, user.date, user.totalCount, user.consecutiveCount, user.maxConsecutiveCount);
  };

  exports.getUser = (id) => {
    db.get("SELECT * FROM users WHERE user = ?", id, (err, row) => {
      return row;
    });
  };

  exports.updateUser = (user) => {
    db.run("UPDATE users SET date = ?, totalCount = ?, consecutiveCount = ?, maxConsecutiveCount = ? WHERE user = ?",
      user.date, user.totalCount, user.consecutiveCount, user.maxConsecutiveCount, user.user);
  };
});
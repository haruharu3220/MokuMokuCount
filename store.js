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
const dbWrapper = require("sqlite3");
let db;
/* 
We're using the sqlite wrapper so that we can make async / await connections
- https://www.npmjs.com/package/sqlite
*/
dbWrapper
  .open({
    filename: dbFile,
    driver: sqlite3.Database
  })
  .then(async dBase => {
    db = dBase;

    // We use try and catch blocks throughout to handle any database errors
    try {
      // The async / await syntax lets us write the db operations in a way that won't block the app
      if (!exists) {
        // Database doesn't exist yet - create Choices and Log tables
        await db.run(
          // "CREATE TABLE Choices (id INTEGER PRIMARY KEY AUTOINCREMENT, language TEXT, picks INTEGER)"
          "CREATE TABLE Users (user TEXT, date TEXT, totalCount INTEGER, consecutiveCount INTEGER, maxConsecutiveCount INTEGER)"
        );

        // Add default choices to table
        await db.run(
          // "INSERT INTO Choices (language, picks) VALUES ('HTML', 0), ('JavaScript', 0), ('CSS', 0)"
          "INSERT INTO Users (user, date, totalCount, consecutiveCount, maxConsecutiveCount ) VALUES ('', '', 0,0,0)"
        );

        // Log can start empty - we'll insert a new record whenever the user chooses a poll option
        await db.run(
          // "CREATE TABLE Log (id INTEGER PRIMARY KEY AUTOINCREMENT, choice TEXT, time STRING)"
          "CREATE TABLE Log (user TEXT, date TEXT, totalCount INTEGER, consecutiveCount INTEGER, maxConsecutiveCount INTEGER)"
          
        );
      } else {
        // We have a database already - write Choices records to log for info
        // console.log(await db.all("SELECT * from Choices"));
        console.log(await db.all("SELECT * from Users"));
        

        //If you need to remove a table from the database use this syntax
        //db.run("DROP TABLE Logs"); //will fail if the table doesn't exist
      }
    } catch (dbError) {
      console.error(dbError);
    }
  });

// Our server script will call these methods to connect to the db
module.exports = {
    /**
   * Get a user from the database
   *
   * Return user data based on id
   */
  getUser: async (id) => {
    try {
      return await new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE user = ?", id, (err, row) => {
          if (err) reject(err);
          resolve(row);
        });
      });
    } catch (dbError) {
      console.error(dbError);
    }
  },
  /**
   * Update a user in the database
   *
   * Update user data based on user object
   */
}  
  
  
// db.serialize(function() {
//   db.run("CREATE TABLE users (user TEXT, date TEXT, totalCount INTEGER, consecutiveCount INTEGER, maxConsecutiveCount INTEGER)");

//   let stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?, ?, ?)");
//   exports.addUser = (user) => {
//     stmt.run(user.user, user.date, user.totalCount, user.consecutiveCount, user.maxConsecutiveCount);
//   };

//   exports.getUser = (id) => {
//     db.get("SELECT * FROM users WHERE user = ?", id, (err, row) => {
//       return row;
//     });
//   };

//   exports.updateUser = (user) => {
//     db.run("UPDATE users SET date = ?, totalCount = ?, consecutiveCount = ?, maxConsecutiveCount = ? WHERE user = ?",
//       user.date, user.totalCount, user.consecutiveCount, user.maxConsecutiveCount, user.user);
//   };
// });
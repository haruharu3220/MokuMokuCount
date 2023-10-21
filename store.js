// Utilities we need
const fs = require("fs");

// Initialize the database
const dbFile = "./data/choices.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
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
          "INSERT INTO Users (user, date, totalCount, consecutiveCount, maxConsecutiveCount ) VALUES ('test', 'test', 0,0,0)"
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
  addUser: async (user) => {
    await db.run("INSERT INTO users (user, date, totalCount, consecutiveCount, maxConsecutiveCount) VALUES (?, ?, ?, ?, ?)",
      user.user, user.date, user.totalCount, user.consecutiveCount, user.maxConsecutiveCount);
  },
  
  
  getUser:  (id) => {
    const option = db.get("SELECT * FROM Users WHERE user = ?", id);
    if(option.user != "U061FDPLLLB") return "hoge"+option.user;
    
    return "huge";
  },
  /**
   * Update a user in the database
   *
   * Update user data based on user object
   */
  updateUser:async (user) => {
    await db.run("UPDATE users SET date = ?, totalCount = ?, consecutiveCount = ?, maxConsecutiveCount = ? WHERE user = ?",
      user.date, user.totalCount, user.consecutiveCount, user.maxConsecutiveCount, user.user);
  },
}
  
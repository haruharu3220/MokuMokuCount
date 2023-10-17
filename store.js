// This is not a real datastore, but it can be if you make it one :)

let messages = {};
let users = {};
let userCount = {};
let me = undefined;
let defaultChannel = undefined;

exports.getMessages = () => {
  return messages;
};

exports.addUser = (user) => {
  users[user.user] = user;
};

exports.getUser = (id) => {
  return users[id];
};

exports.setUser = (user) => {
  users[user.user] = user;
};

exports.addUserCount = (user) =>{
  userCount[user.user] = user
}
exports.updateUserCount = (id) =>{
  userCount[id].totalCount ++;
  userCount[id].consecutiveCount ++;
  userCount[id].maxconsecutiveCount ++;
        
}

exports.getUserCount = (id) => {
  return userCount[id];
};

exports.setChannel = (channel) => {
  defaultChannel = channel;
};

exports.getChannel = () => {
  return defaultChannel;
};

exports.setMe = (id) => {
  me = id;
};

exports.getMe = () => {
  return me;
};

exports.getCount = (id) => {
  return 
}
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
  users[user.user].date = user.date;
  users[user.user].totalCount = user.totalCount;
  users[user.user].consecutiveCount= user.consecutiveCount;
  users[user.user].maxConsecutiveCount = user.maxConsecutiveCount;
};

exports.getUser = (id) => {
  return users[id];
};


exports.updateUser = (user) =>{
  users[user.user].date = user.date;
  
  users[user.user].totalCount =user.totalCount;
  users[user.user].consecutiveCount =user.consecutiveCount;
  users[user.user].maxConsecutiveCount =user.maxConsecutiveCount;
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
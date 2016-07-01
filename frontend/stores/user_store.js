const Store = require('flux/utils').Store;
const dispatcher = require('../dispatcher/dispatcher');
const UserConstants = require('../constants/user_constants');
const SessionConstants = require('../constants/session_constants');

let _users = {};

const UserStore = new Store(dispatcher);

UserStore.all = function () {
  return Object.keys(_users).map(user => {
  	return _users[user];
  });
};

UserStore.resetAllUsers = function(users) {
  _users = {};
  users.forEach(user => {
    _users[user.id] = user;
  });
  this.__emitChange();
};

UserStore.addUser = function(user){
  _users[user.id] = user;
  this.__emitChange();
};

UserStore.find = function(id){
  return _users[id];
};

UserStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case UserConstants.USERS_RECEIVED:
      this.resetAllUsers(payload.users);
      break;
    case UserConstants.USER_RECEIVED:
      this.addUser(payload.user);
      break;
    case SessionConstants.USER_FOUND:
      this.addUser(payload.user);
      break;
  }
};

module.exports = UserStore;

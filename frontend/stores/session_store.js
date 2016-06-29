const Store = require('flux/utils').Store;
const dispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');
const hashHistory = require('react-router').hashHistory;

let _currentUser = {};

const SessionStore = new Store(dispatcher);

SessionStore._login = function(payload){
  _currentUser = payload.user;
  hashHistory.push("index");
  this.__emitChange();
};

SessionStore._found = function(payload){
  _currentUser = payload.user;
  this.__emitChange();
};

SessionStore._logout = function(){
  _currentUser = {};
  hashHistory.push("/");
  this.__emitChange();
};

SessionStore.currentUser = function(){
  return _currentUser.username;
};

SessionStore.isUserLoggedIn = function(){
  return Boolean(Object.keys(_currentUser).length);
};

SessionStore.__onDispatch = function(payload){
  switch(payload.actionType) {
    case SessionConstants.LOGIN:
      this._login(payload);
      break;
    case SessionConstants.LOGOUT:
      this._logout();
      break;
    case SessionConstants.USER_FOUND:
      this._found(payload);
      break;
  }
};

module.exports = SessionStore;

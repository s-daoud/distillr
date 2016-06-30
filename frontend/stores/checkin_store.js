const Store = require('flux/utils').Store;
const dispatcher = require('../dispatcher/dispatcher');
const CheckinConstants = require('../constants/checkin_constants');
const CommentConstants = require('../constants/comment_constants');
const LikeConstants = require('../constants/like_constants');
const hashHistory = require('react-router').hashHistory;

let _checkins = {};

const CheckinStore = new Store(dispatcher);

CheckinStore.all = function(){
  return Object.keys(_checkins).map(checkin => {
  	return _checkins[checkin];
  });
};

CheckinStore.find = function(id){
  return _checkins[id];
};

CheckinStore.resetAllCheckins = function(checkins){
  _checkins = {};
  checkins.forEach(checkin => {
    _checkins[checkin.id] = checkin;
  });
  this.__emitChange();
};

CheckinStore.addCheckin = function(checkin){
  _checkins[checkin.id] = checkin;
  this.__emitChange();
};

CheckinStore.removeCheckin = function(checkin){
  delete _checkins[checkin.id];
  this.__emitChange();
};

CheckinStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case CheckinConstants.CHECKINS_RECEIVED:
      this.resetAllCheckins(payload.checkins);
      break;
    case CheckinConstants.CHECKIN_RECEIVED:
      this.addCheckin(payload.checkin);
      break;
    case CheckinConstants.CHECKIN_REMOVED:
      this.removeCheckin(payload.checkin);
      break;
  }
};

module.exports = CheckinStore;


// all friends
// all drinks

// add comment - add checkin
// add like - add checkin
// delete comment - add checkin
// delete like - add checkin

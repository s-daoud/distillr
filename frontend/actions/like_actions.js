const dispatcher = require('../dispatcher/dispatcher');
const CheckinConstants = require('../constants/checkin_constants');
const LikeApiUtil = require('../util/like_api_util');
const ErrorActions = require('./error_actions');

const LikeActions = {
  createLike(data){
    LikeApiUtil.createLike(data, LikeActions.receiveSingleLike);
  },
  destroyLike(checkinId, id){
    LikeApiUtil.removeLike(checkinId, id, LikeActions.removeLike);
  },
  receiveSingleLike(checkin){
    dispatcher.dispatch({
      actionType: CheckinConstants.CHECKIN_RECEIVED,
      checkin: checkin
    });
  },
  removeLike(checkin){
    dispatcher.dispatch({
      actionType: CheckinConstants.CHECKIN_RECEIVED,
      checkin: checkin
    });
  }
};

module.exports = LikeActions;

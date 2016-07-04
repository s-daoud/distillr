const dispatcher = require('../dispatcher/dispatcher');
const CheckinConstants = require('../constants/checkin_constants');
const CommentApiUtil = require('../util/comment_api_util');

const CommentActions = {
  createComment(data){
    CommentApiUtil.createComment(data, CommentActions.receiveSingleComment);
  },
  destroyComment(checkinId, id){
    CommentApiUtil.removeComment(checkinId, id, CommentActions.removeComment);
  },
  receiveSingleComment(checkin){
    dispatcher.dispatch({
      actionType: CheckinConstants.CHECKIN_RECEIVED,
      checkin: checkin
    });
  },
  removeComment(checkin){
    dispatcher.dispatch({
      actionType: CheckinConstants.CHECKIN_RECEIVED,
      checkin: checkin
    });
  }
};

module.exports = CommentActions;

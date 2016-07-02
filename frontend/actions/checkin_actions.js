const dispatcher = require('../dispatcher/dispatcher');
const CheckinConstants = require('../constants/checkin_constants');
const CheckinApiUtil = require('../util/checkin_api_util');
const ErrorActions = require('./error_actions');

const CheckinActions = {
  fetchAllCheckins(source){
    CheckinApiUtil.fetchAllCheckins(source, CheckinActions.receiveAllCheckins);
  },
  createCheckin(data){
    CheckinApiUtil.createCheckin("checkin", data, CheckinActions.receiveSingleCheckin, ErrorActions.setErrors);
  },
  destroyCheckin(id){
    CheckinApiUtil.removeCheckin(id, CheckinActions.removeCheckin);
  },
  receiveAllCheckins(checkins){
    dispatcher.dispatch({
      actionType: CheckinConstants.CHECKINS_RECEIVED,
      checkins: checkins
    });
  },
  receiveSingleCheckin(checkin){
    dispatcher.dispatch({
      actionType: CheckinConstants.CHECKIN_RECEIVED,
      checkin: checkin
    });
  },
  removeCheckin(checkin){
    dispatcher.dispatch({
      actionType: CheckinConstants.CHECKIN_REMOVED,
      checkin: checkin
    });
  }
};

module.exports = CheckinActions;

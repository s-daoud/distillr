const dispatcher = require('../dispatcher/dispatcher');
const UserConstants = require('../constants/user_constants');
const FriendApiUtil = require('../util/friend_api_util');
const ErrorActions = require('./error_actions');

const FriendActions = {
  fetchAllFriends(userId){
    FriendApiUtil.fetchAllFriends(userId, FriendActions.receiveSingleUser);
  },
  createFriend(data){
    FriendApiUtil.createFriend(data, FriendActions.receiveSingleUser);
  },
  editFriend(id){
    FriendApiUtil.updateFriend(id, FriendActions.receiveSingleUser);
  },
  destroyFriend(id){
    FriendApiUtil.removeFriend(id, FriendActions.receiveSingleUser);
  },
  receiveSingleUser(user){
    dispatcher.dispatch({
      actionType: UserConstants.USER_RECEIVED,
      user: user
    });
  }
};

module.exports = FriendActions;

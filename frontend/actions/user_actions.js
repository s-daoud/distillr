const dispatcher = require('../dispatcher/dispatcher');
const UserConstants = require('../constants/user_constants');
const UserApiUtil = require('../util/user_api_util');

const UserActions = {
  fetchAllUsers(){
    UserApiUtil.fetchAllUsers(UserActions.receiveAllUsers);
  },
  fetchSingleUser(id){
    UserApiUtil.fetchSingleUser(id, UserActions.receiveSingleUser);
  },
  receiveAllUsers(users){
    dispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: users
    });
  },
  receiveSingleUser(user){
    dispatcher.dispatch({
      actionType: UserConstants.USER_RECEIVED,
      user: user
    });
  }
};

module.exports = UserActions;

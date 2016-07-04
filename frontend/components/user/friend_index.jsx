const React = require('react');

const UserStore = require('../../stores/user_store');
const SessionStore = require('../../stores/session_store');
const FriendActions = require('../../actions/friend_actions');

const FriendIndexItem = require('./friend_index_item');
const FriendRequestIndex = require('./friend_request_index');

const FriendIndex = React.createClass({
  getInitialState(){
    return {friends: []};
  },
  componentDidMount(){
    FriendActions.fetchAllFriends(SessionStore.currentUser().id);
    this.userListener = UserStore.addListener(this._onChange);
  },
  componentWillUnmount(){
    this.userListener.remove();
  },
  _onChange(){
    let friends = UserStore.find(SessionStore.currentUser().id).friends;
    this.setState({friends: friends});
  },
  render(){
    let items;
    if (this.state.friends.length >= 1) {
      items = this.state.friends.map( friendObj => {
        return <FriendIndexItem friendId={friendObj.friend_id} key={friendObj.friend_id} />;
      });
    }
    return (
      <div className="main-flex">
        <div className="friend-index-flex feed">
          <h3>Friends</h3>
          <div className="friend-box">
            {
              this.state.friends.map( friendObj => {
                return <FriendIndexItem friendId={friendObj.friend_id} key={friendObj.friend_id} />;
              })
            }
          </div>
        </div>
        <div className="friend-flex">
          <FriendRequestIndex />
        </div>
      </div>
    );
  }
});

module.exports = FriendIndex;

const React = require('react');
const UserStore = require('../stores/user_store');
const SessionStore = require('../stores/session_store');
const FriendActions = require('../actions/friend_actions');
const FriendRequestItem = require('./friend_request_item');

const FriendRequestIndex = React.createClass({
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
    let friends = UserStore.find(SessionStore.currentUser().id).requesteds;
    this.setState({friends: friends});
  },
  render(){
    let items;
    if (this.state.friends.length >= 1) {
      items = this.state.friends.map( friendObj => {
        return <FriendRequestItem friendId={friendObj.user_id} key={friendObj.user_id} />;
      });
    } else {
      items = <div className="comment-item"><p>No Requests</p></div>;
    }
    return (
      <div className="feed">
        <h3>Friend Requests</h3>
        <div className="friend-box">
          {items}
        </div>
      </div>
    );
  }
});

module.exports = FriendRequestIndex;

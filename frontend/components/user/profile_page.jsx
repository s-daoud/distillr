const React = require('react');

const UserStore = require('../../stores/user_store');
const SessionStore = require('../../stores/session_store');
const UserActions = require('../../actions/user_actions');
const FriendActions = require('../../actions/friend_actions');

const CheckinIndex = require('../checkin/checkin_index');

const ProfilePage = React.createClass({
  getInitialState(){
    return {user: {}};
  },
  componentDidMount(){
    window.scrollTo(0,0);
    this.userListener = UserStore.addListener(this._onChange);
    UserActions.fetchAllUsers();
  },
  componentWillUnmount(){
    this.userListener.remove();
  },
  _onChange(){
    this.setState({user: UserStore.find(this.props.params.userId)});
  },
  componentWillReceiveProps(newProps){
    this.setState({user: UserStore.find(newProps.params.userId)});
  },
  addFriend(e){
    e.preventDefault();
    FriendActions.createFriend({friend_id: this.props.params.userId});
  },
  removeFriend(e){
    e.preventDefault();
    let currentFriendId;
    SessionStore.currentUser().friends.forEach (friend => {
      if (friend.friend_id === parseInt(this.props.params.userId)) {
        currentFriendId = friend.id;
      }
    });
    FriendActions.destroyFriend(currentFriendId);
  },
  render(){
    let friendButton;
    let username;
    if(this.state.user) {
      username = this.state.user.username;
      if (this.state.user.id) {
        friendButton = <button className="friend-button" onClick={this.addFriend}>Add Friend</button>;

        this.state.user.requesteds.forEach( friend => {
          if (friend.friend_id === parseInt(this.props.params.userId) && friend.user_id === SessionStore.currentUser().id){
            friendButton = <button className="friend-button" id="pending" disabled>Pending</button>;
          }
        });

        this.state.user.requests.forEach( friend => {
          if (friend.friend_id === parseInt(this.props.params.userId) && friend.user_id === SessionStore.currentUser().id){
            friendButton = <button className="friend-button" id="pending" disabled>Pending</button>;
          }
        });

        this.state.user.requests.forEach( friend => {
          if (friend.user_id === this.state.user.id){
            friendButton = <button className="friend-button" id="pending" disabled>Pending</button>;
          }
        });

        this.state.user.friends.forEach( friend => {
          if (friend.user_id === parseInt(this.props.params.userId) && friend.friend_id === SessionStore.currentUser().id){
            friendButton = <button className="friend-button" onClick={this.removeFriend}>Remove Friend</button>;
          }
        });

        if (SessionStore.currentUser().id === parseInt(this.props.params.userId)){
          friendButton = <div></div>;
        }
      }
    }

    return (
      <div>
        <div className="profile">
          <h1>{username}</h1>
          {friendButton}
        </div>
        <CheckinIndex source={{loc: "profile", id: this.props.params.userId}}/>
      </div>
    );
  }
});

module.exports = ProfilePage;

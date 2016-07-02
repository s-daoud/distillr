const React = require('react');
const Link = require('react-router').Link;

const UserStore = require('../stores/user_store');
const SessionStore = require('../stores/session_store');
const UserActions = require('../actions/user_actions');
const FriendActions = require('../actions/friend_actions');
const FriendRequestIndex = require('./friend_request_index');

const FriendIndexItem = React.createClass({
  getInitialState(){
    return {user: {}};
  },
  componentDidMount(){
    this.userListener = UserStore.addListener(this._onChange);
    UserActions.fetchAllUsers();
  },
  componentWillUnmount(){
    this.userListener.remove();
  },
  componentWillReceiveProps(newProps){
    this.setState({user: UserStore.find(newProps.friendId)});
  },
  _onChange(){
    this.setState({user: UserStore.find(this.props.friendId)});
  },
  rejectFriend(e){
    e.preventDefault();
    FriendActions.destroyFriend(this.id);
  },
  render(){
    let user;
    let rejectButton;

    if (this.state.user) {
      if(this.state.user.id){
        this.state.user.friends.forEach( req => {
          if (SessionStore.currentUser().id === req.friend_id){
            this.id = req.id;
          }
        });
      }
    }

    return (
      <div className="comment-item">
        <p className="name-large"><Link to={`users/${this.state.user.id}`}>{this.state.user.username}</Link></p>
        <button onClick={this.rejectFriend}>
          <span className="fa-stack fa-lg">
            <i className="fa fa-square fa-stack-2x"></i>
            <i className="fa fa-times fa-stack-1x"></i>
          </span>
        </button>
      </div>
    );
  }
});

module.exports = FriendIndexItem;

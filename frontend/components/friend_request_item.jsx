const React = require('react');
const Link = require('react-router').Link;

const UserStore = require('../stores/user_store');
const SessionStore = require('../stores/session_store');
const UserActions = require('../actions/user_actions');
const FriendActions = require('../actions/friend_actions');

const FriendRequestItem = React.createClass({
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
  acceptFriend(e){
    e.preventDefault();
    FriendActions.editFriend(this.id);
  },
  rejectFriend(e){
    e.preventDefault();
    FriendActions.destroyFriend(this.id);
  },
  render(){
    let user;
    let acceptButton;
    let rejectButton;

    if (this.state.user) {
      if(this.state.user.id){
        this.state.user.requests.forEach( req => {
          if (SessionStore.currentUser().id === req.friend_id){
            this.id = req.id;
          }
        });

        user = <p><Link to={`users/${this.state.user.id}`}>{this.state.user.username}</Link></p>;
        acceptButton = <button onClick={this.acceptFriend}>
        <span className="fa-stack fa-lg">
          <i className="fa fa-square green fa-stack-2x"></i>
          <i className="fa fa-check fa-stack-1x"></i>
        </span>
        </button>;
        rejectButton = <button onClick={this.rejectFriend}>
          <span className="fa-stack fa-lg">
            <i className="fa fa-square fa-stack-2x"></i>
            <i className="fa fa-times fa-stack-1x"></i>
          </span>
        </button>;
      }
    }

    return (
      <div className="comment-item button-flex">
        <div>{user}</div>
        <div>
          {acceptButton}
          {rejectButton}
        </div>
      </div>
    );
  }
});

module.exports = FriendRequestItem;

const React = require('react');
const Link = require('react-router').Link;

const UserStore = require('../../stores/user_store');
const SessionStore = require('../../stores/session_store');
const UserActions = require('../../actions/user_actions');
const FriendActions = require('../../actions/friend_actions');

const FriendRequestItem = React.createClass({
  getInitialState(){
    return {friend: {}};
  },
  componentDidMount(){
    this.userListener = UserStore.addListener(this._onChange);
    UserActions.fetchAllUsers();
  },
  componentWillUnmount(){
    this.userListener.remove();
  },
  componentWillReceiveProps(newProps){
    this.setState({friend: UserStore.find(newProps.friendId)});
  },
  _onChange(){
    this.setState({friend: UserStore.find(this.props.friendId)});
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
    let friend;
    let acceptButton;
    let rejectButton;

    if (this.state.friend) {
      if(this.state.friend.id){
        this.state.friend.requests.forEach( req => {
          if (SessionStore.currentUser().id === req.friend_id){
            this.id = req.id;
          }
        });

        friend = <p><Link to={`users/${this.state.friend.id}`}>{this.state.friend.username}</Link></p>;

        acceptButton = <button onClick={this.acceptFriend}>
        <span className="fa-stack fa-lg green-hover">
          <i className="fa fa-square green fa-stack-2x"></i>
          <i className="fa fa-check fa-stack-1x"></i>
        </span>
        </button>;

        rejectButton = <button onClick={this.rejectFriend}>
          <span className="fa-stack fa-lg red-hover">
            <i className="fa fa-square fa-stack-2x"></i>
            <i className="fa fa-times fa-stack-1x"></i>
          </span>
        </button>;
      }
    }

    return (
      <div className="comment-item button-flex">
        <div>{friend}</div>
        <div>
          {acceptButton}
          {rejectButton}
        </div>
      </div>
    );
  }
});

module.exports = FriendRequestItem;

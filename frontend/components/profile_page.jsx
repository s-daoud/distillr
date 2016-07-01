const React = require('react');

const UserStore = require('../stores/user_store');
const UserActions = require('../actions/user_actions');
const CheckinIndex = require('./checkin_index');

const ProfilePage = React.createClass({
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
    const user = UserStore.find(newProps.params.userId);
    this.setState({user: user});
    window.scrollTo(0, 0);
  },
  _onChange(){
    this.setState({user: UserStore.find(this.props.params.userId)});
  },
  render(){
    return (
      <div>
        <div className="profile">
          <h1>{this.state.user.username}</h1>
        </div>
        <CheckinIndex  source={{loc: "profile", id: this.props.params.userId}}/>
      </div>
    );
  }
});

module.exports = ProfilePage;

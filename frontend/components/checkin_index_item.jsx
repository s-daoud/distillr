const React = require('react');
const Link = require('react-router').Link;

const CheckinActions = require('../actions/checkin_actions');
const SessionStore = require('../stores/session_store');
const CheckinLike = require('./checkin_likes');
const CommentIndex = require('./comment_index');

const CheckinIndexItem = React.createClass({
  deleteCheckin(e){
    e.preventDefault();
    CheckinActions.destroyCheckin(this.props.checkin.id);
  },
  render(){
    let deleteButton;

    if(SessionStore.currentUser().id === this.props.checkin.userId){
      deleteButton = <li><button onClick={this.deleteCheckin}>Delete</button></li>;
    }
    return (
      <ul>
        <hr />
        <li>{this.props.checkin.username}</li>
        <li><Link to={`drinks/${this.props.checkin.drinkId}`}>{this.props.checkin.drink}</Link></li>
        <li>{this.props.checkin.rating}</li>
        <li>{this.props.checkin.review}</li>
        <CheckinLike checkin={this.props.checkin}/>
        <CommentIndex checkin={this.props.checkin}/>
        {deleteButton}
      </ul>
    );
  }
});

module.exports = CheckinIndexItem;

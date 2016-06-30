const React = require('react');

const CheckinStore = require('../stores/checkin_store');
const SessionStore = require('../stores/session_store');
const CommentActions = require('../actions/comment_actions');

const CommentIndexItem = React.createClass({
  deleteComment(e){
    e.preventDefault();
    CommentActions.destroyComment(this.props.comment.checkinId, this.props.comment.id);
  },
  render(){
    let deleteButton;

    if(SessionStore.currentUser().id === this.props.comment.userId){
      deleteButton = <button onClick={this.deleteComment}>Delete</button>;
    }
    return (
      <div>
        {this.props.comment.username}:&nbsp;
        {this.props.comment.comment}&nbsp;
        {deleteButton}
      </div>
    );
  }
});

module.exports = CommentIndexItem;

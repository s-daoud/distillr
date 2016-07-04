const React = require('react');
const Link = require('react-router').Link;

const SessionStore = require('../../stores/session_store');
const CommentActions = require('../../actions/comment_actions');

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
      <div className="comment-item">
        <p>
          <Link to={`users/${this.props.comment.userId}`}>{this.props.comment.username}</Link>:&nbsp;
          {this.props.comment.comment}
        </p>
        <p className="delete">{deleteButton}</p>
      </div>
    );
  }
});

module.exports = CommentIndexItem;

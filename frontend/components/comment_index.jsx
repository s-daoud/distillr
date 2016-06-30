const React = require('react');

const CheckinStore = require('../stores/checkin_store');
const CommentActions = require('../actions/comment_actions');
const CommentIndexItem = require('./comment_index_item');

const CommentIndex = React.createClass({
  getInitialState(){
    this.id = this.props.checkin.id;
    return {comments: CheckinStore.find(this.id).comments,
            comment: ""};
  },
  componentDidMount(){
    this.checkinListener = CheckinStore.addListener(this._onChange);
  },
  componentWillUnmount(){
    this.checkinListener.remove();
  },
  _onChange(){
    this.setState({comments: CheckinStore.find(this.id).comments});
  },
  componentWillReceiveProps(newProps){
    this.setState({comments: newProps.checkin.comments});
  },
  updateComment(e){
    e.preventDefault();
    this.setState({comment: e.target.value});
  },
  addComment(e){
    e.preventDefault();
    CommentActions.createComment({checkin_id: this.props.checkin.id, comment: this.state.comment});
    this.setState({comment: ""});
  },
  render(){
    return (
      <div>
        <textarea placeholder="Add Comment" onChange={this.updateComment} value={this.state.comment} />
        <button onClick={this.addComment}>Add Comment</button>
        {
          this.state.comments.map(comment => {
            return <CommentIndexItem comment={comment} key={comment.id} />;
          })
        }
      </div>
    );
  }
});

module.exports = CommentIndex;

//checkin id, comment

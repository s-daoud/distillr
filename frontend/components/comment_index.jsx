const React = require('react');

const CheckinStore = require('../stores/checkin_store');
const CommentActions = require('../actions/comment_actions');
const CommentIndexItem = require('./comment_index_item');
const CheckinLike = require('./checkin_likes');

const CommentIndex = React.createClass({
  getInitialState(){
    this.id = this.props.checkin.id;
    return {comments: this.props.checkin.comments,
            comment: "", open: false};
  },
  componentDidMount(){
    this.checkinListener = CheckinStore.addListener(this._onChange);
  },
  componentWillUnmount(){
    this.checkinListener.remove();
  },
  _onChange(){
    if (CheckinStore.find(this.id) === undefined) {
      return;
    }
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
  toggleComment(e){
    e.preventDefault();
    this.setState({open: !this.state.open});
  },
  render(){
    let cName = "slide";
    if (this.state.open){
      cName += " open";
    }
    return (
      <div>
        <div>
          <button className="cheers" onClick={this.toggleComment}>Comment</button>
          <CheckinLike checkin={this.props.checkin}/>
        </div>

        <div className={cName}>
          <div className="comment clearfix">
            <textarea placeholder="Leave a comment..." onChange={this.updateComment} value={this.state.comment} />
            <button className="cheers" id="post" onClick={this.addComment}>Post</button>
          </div>
        </div>
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

const React = require('react');

const CheckinStore = require('../stores/checkin_store');
const SessionStore = require('../stores/session_store');
const LikeActions = require('../actions/like_actions');

const CheckinLike = React.createClass({
  getInitialState(){
    let likes = this.props.checkin.likes;
    let followState = false;
    likes.forEach(like => {
      if(SessionStore.currentUser().id === like.user_id){
        followState = true;
      }
    });
    return {followState: followState, numLikes: likes.length};
  },
  componentWillReceiveProps(newProps){
    this.setState({numLikes: newProps.checkin.likes.length});
  },
  toggle(e){
    e.preventDefault();
    if (!this.state.followState){
      LikeActions.createLike({checkin_id: this.props.checkin.id});
    } else {
      let likeId;
      this.props.checkin.likes.forEach( like => {
        if (SessionStore.currentUser().id === like.user_id){
          likeId = like.id;
        }
      });
      LikeActions.destroyLike(this.props.checkin.id, likeId);
    }
    this.setState({followState: !this.state.followState});
  },
  render(){
    let buttonText = "Like";
    if (this.state.followState === true){
      buttonText = "Unlike";
    }
    return (
      <div>
        <button onClick={this.toggle}>{buttonText}</button>
        &nbsp;{this.state.numLikes}
      </div>
    );
  }
});

module.exports = CheckinLike;

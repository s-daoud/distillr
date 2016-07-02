const React = require('react');

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
    let cName = "cheers";
    let iconName = "fa fa-glass";
    if (this.state.followState === true){
      cName += " clicked";
      iconName += " gold";
    }
    return (
      <div>
        <button className={cName} onClick={this.toggle}>
          <i className={iconName}></i>&nbsp;Cheers!
        </button>
        <div className="num-cheers">{this.state.numLikes}&nbsp;<i className="fa fa-glass gold"></i></div>
      </div>
    );
  }
});

module.exports = CheckinLike;

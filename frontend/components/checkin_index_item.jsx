const React = require('react');
const Link = require('react-router').Link;
const Rating = require('react-rating');

const CheckinActions = require('../actions/checkin_actions');
const SessionStore = require('../stores/session_store');
const CommentIndex = require('./comment_index');

const CheckinIndexItem = React.createClass({
  deleteCheckin(e){
    e.preventDefault();
    CheckinActions.destroyCheckin(this.props.checkin.id);
  },
  render(){
    let deleteButton;

    if(SessionStore.currentUser().id === this.props.checkin.userId){
      deleteButton = <button className="delete" onClick={this.deleteCheckin}>Delete</button>;
    }

    return (
      <div className="checkin-item">
        <div className="checkin-info clearfix">
          <h4><p><Link to={`users/${this.props.checkin.userId}`}>{this.props.checkin.username} </Link>
          is drinking a <Link to={`drinks/${this.props.checkin.drinkId}`}>{this.props.checkin.drink}</Link></p>
          <p>{deleteButton}</p></h4>
          <img className="drink-img-small" src={this.props.checkin.drinkImg} />
          <div className="checkin-content">
            {this.props.checkin.review} <br />

            <Rating placeholderRate={this.props.checkin.rating}
                    empty="fa fa-glass grey fa-2x" placeholder="fa fa-glass red-gold fa-2x"
                    readonly={true}/>

          </div>
          <CommentIndex checkin={this.props.checkin}/>
        </div>
      </div>
    );
  }
});

module.exports = CheckinIndexItem;

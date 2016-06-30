const React = require('react');
const Link = require('react-router').Link;

const CheckinActions = require('../actions/checkin_actions');

const CheckinIndexItem = React.createClass({
  deleteCheckin(e){
    e.preventDefault();
    CheckinActions.destroyCheckin(this.props.checkin.id);
  },
  render(){
    return (
      <ul>
        <li>{this.props.checkin.username}</li>
        <li><Link to={`drinks/${this.props.checkin.drinkId}`}>{this.props.checkin.drink}</Link></li>
        <li>{this.props.checkin.rating}</li>
        <li>{this.props.checkin.review}</li>
        <li><button onClick={this.deleteCheckin}>Delete</button></li>
      </ul>
    );
  }
});

module.exports = CheckinIndexItem;

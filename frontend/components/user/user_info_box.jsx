const React = require('react');

const UserInfoBox = React.createClass({
  render(){
    return (
      <div className="feed">
        <h3>User Stats</h3>
        <div className="friend-box user-box">
          <div className="stat">
            <span className="stat-num">{this.props.user.uniqueDrinks}</span>
            <span className="stat-text">Unique Drinks</span>
          </div>
          <div className="stat">
            <span className="stat-num">{this.props.user.totalDrinks}</span>
            <span className="stat-text">Total Drinks</span>
          </div>
          <div className="stat">
            <span className="stat-num">{this.props.user.uniqueVenues}</span>
            <span className="stat-text">Unique Venues</span>
          </div>
          <div className="stat">
            <span className="stat-num">{this.props.user.numFriends}</span>
            <span className="stat-text">Number of Friends</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserInfoBox;

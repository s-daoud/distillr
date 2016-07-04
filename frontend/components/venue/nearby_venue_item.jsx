const React = require('react');
const Link = require('react-router').Link;

const NearbyVenueItem = React.createClass({
  render(){
    return (
      <div className="comment-item">
        <p><Link to={`venues/${this.props.venue.id}`}>{this.props.venue.name}</Link></p>
        <div>
          <p id="nearby-desc">{this.props.venue.address}<br />
          {this.props.venue.description}</p>
        </div>
      </div>
    );
  }
});

module.exports = NearbyVenueItem;

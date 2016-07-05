const React = require('react');
const Link = require('react-router').Link;
const Rating = require('react-rating');

const VenueRatingItem = React.createClass({
  render(){
    return (
      <div className="comment-item">
        <p><Link to={`venues/${this.props.venue.id}`}>{this.props.venue.name}</Link></p>
        <Rating placeholderRate={parseFloat(this.props.venue.rating)} fractions={parseInt("10")}
                empty="fa fa-glass grey fa-2x" placeholder="fa fa-glass red-gold fa-2x"
                readonly={true}/>
      </div>
    );
  }
});

module.exports = VenueRatingItem;

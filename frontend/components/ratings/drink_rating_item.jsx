const React = require('react');
const Link = require('react-router').Link;
const Rating = require('react-rating');

const DrinkRatingItem = React.createClass({
  render(){
    return (
      <div className="comment-item">
        <p><Link to={`drinks/${this.props.drink.id}`}>{this.props.drink.name}</Link></p>
        <Rating placeholderRate={parseFloat(this.props.drink.rating)} fractions={parseInt("10")}
                empty="fa fa-glass grey fa-2x" placeholder="fa fa-glass red-gold fa-2x"
                readonly={true}/>
      </div>
    );
  }
});

module.exports = DrinkRatingItem;

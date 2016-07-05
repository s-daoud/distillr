const React = require('react');

const DrinkActions = require('../../actions/drink_actions');
const VenueActions = require('../../actions/venue_actions');
const DrinkStore = require('../../stores/drink_store');
const VenueStore = require('../../stores/venue_store');

const DrinkRatingItem = require('./drink_rating_item.jsx');
const VenueRatingItem = require('./venue_rating_item.jsx');

const TopRated = React.createClass({
  getInitialState(){
    return {drinks: {}, venues: {}};
  },
  componentDidMount(){
    this.drinkListener = DrinkStore.addListener(this._onChange);
    this.venueListener = VenueStore.addListener(this._onChange);
    DrinkActions.fetchAllDrinks({loc: "ratings"});
    VenueActions.fetchAllVenues({loc: "ratings"});
  },
  componentWillUnmount(){
    this.drinkListener.remove();
    this.venueListener.remove();
  },
  _onChange(){
    this.setState({drinks: DrinkStore.all(), venues: VenueStore.all()});
  },
  render(){
    let drinkKeys = Object.keys(this.state.drinks).sort( (a, b) => {
      return (this.state.drinks[b].rating - this.state.drinks[a].rating);
    });
    let venueKeys = Object.keys(this.state.venues).sort( (a, b) => {
      return (this.state.venues[b].rating - this.state.venues[a].rating);
    });

    return (
      <div className="rating-flex">
        <div className="feed">
          <h3>Top Drinks</h3>
          <div className="friend-box">
            {
              drinkKeys.map (drinkId => {
                return <DrinkRatingItem drink={this.state.drinks[drinkId]} key={this.state.drinks[drinkId].id}/>;
              })
            }
          </div>
        </div>

        <div className="feed">
          <h3>Top Venues</h3>
          <div className="friend-box">
            {
              venueKeys.map (venueId => {
                return <VenueRatingItem venue={this.state.venues[venueId]} key={this.state.venues[venueId].id}/>;
              })
            }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TopRated;

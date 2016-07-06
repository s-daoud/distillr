const React = require('react');
const Rating = require('react-rating');

const VenueStore = require('../../stores/venue_store');
const VenueActions = require('../../actions/venue_actions');

const CheckinIndex = require('../checkin/checkin_index');
const VenueMap = require('./venue_map');

const VenuePage = React.createClass({
  getInitialState(){
    return {venue: {}};
  },
  componentDidMount(){
    window.scrollTo(0,0);
    this.venueListener = VenueStore.addListener(this._onChange);
    VenueActions.fetchSingleVenue(this.props.params.venueId);
  },
  componentWillUnmount(){
    this.venueListener.remove();
  },
  componentWillReceiveProps(newProps){
    const venue = VenueStore.find(newProps.params.venueId);
    this.setState({venue: venue});
  },
  _onChange(){
    this.setState({venue: VenueStore.find(this.props.params.venueId)});
  },
  render(){
    return(
      <div className="venue-img">
        <div className="venue-flex">
          <div className="venue-sidebar">
            <div className="venue-info">
              <p className="venue-name">{this.state.venue.name}</p>
              <p>{this.state.venue.description}</p>
              <p>{this.state.venue.address}</p>
              <Rating className="venue-rating" placeholderRate={parseFloat(this.state.venue.rating)}
                      fractions={parseInt("10")} empty="fa fa-glass grey fa-2x"
                      placeholder="fa fa-glass red-gold fa-2x" readonly={true}/>
            </div>
            <div className="venue-info">
              <VenueMap venue={this.state.venue}/>
            </div>
          </div>
          <div className="venue-feed">
            <CheckinIndex source={{loc: "venue", id: this.props.params.venueId}}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = VenuePage;

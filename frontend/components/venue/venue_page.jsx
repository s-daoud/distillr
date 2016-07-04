const React = require('react');

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
      <div className="venue-flex">
        <div className="venue-sidebar">
          <div className="venue-info">
            <h3>{this.state.venue.name}</h3>
            <p>{this.state.venue.description}</p>
            <p>{this.state.venue.address}</p>
          </div>
          <div className="venue-info">
            <VenueMap venue={this.state.venue}/>
          </div>
        </div>
        <div className="venue-feed">
          <CheckinIndex source={{loc: "venue", id: this.props.params.venueId}}/>
        </div>
      </div>
    );
  }
});

module.exports = VenuePage;

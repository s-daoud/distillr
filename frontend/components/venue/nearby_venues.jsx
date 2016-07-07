const React = require('react');
const ReactDOM = require('react-dom');
const hashHistory = require('react-router').hashHistory;

const VenueStore = require('../../stores/venue_store');
const VenueActions = require('../../actions/venue_actions');

const NearbyVenueItem = require('./nearby_venue_item');

const NearbyVenues = React.createClass({
  getInitialState(){
    return {venues: VenueStore.all(), sortedVenues: []};
  },
  componentDidMount(){
    this.venueListener = VenueStore.addListener(this._onChange);
    VenueActions.fetchAllVenues();
    navigator.geolocation.getCurrentPosition( position => {
      this.makeMap(position.coords.latitude, position.coords.longitude);
    });
  },
  componentWillUnmount(){
    this.venueListener.remove();
  },
  _onChange(){
    this.setState({venues: VenueStore.all()});
  },
  makeMap(lat, lng){
    const mapDOMNode = ReactDOM.findDOMNode(this.refs.nearbyMap);
    const mapOptions = {
      center: {lat: lat, lng: lng},
      zoom: 15
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);

    let icon = {
      url: "https://d30y9cdsu7xlg0.cloudfront.net/png/25718-200.png",
      scaledSize: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0)
    };

    let clientMarker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: this.map,
      icon: icon
    });
    this.setMarkers({lat: lat, lng: lng});
  },
  setMarkers(clientLocation){
    const geocoder = new google.maps.Geocoder();
    let clientLatLng = new google.maps.LatLng(clientLocation);
    let venues = Object.assign([], this.state.venues);
    let coordVenues = {};
    let count = 0;


    venues.slice(0, 10).forEach( venue => {
      geocoder.geocode( {"address": venue.address}, (results, status) => {
        debugger
        let latLng = new google.maps.LatLng({lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()});
        let dist = google.maps.geometry.spherical.computeDistanceBetween(clientLatLng, latLng);
        coordVenues[dist] = { venue, latLng };

        count++;
        if (count === venues.slice(0, 10).length) {
          this.addMarkers(coordVenues);
        }
      });
    });
  },
  addMarkers(coordVenues){
    const dists = Object.keys(coordVenues).sort( (a, b) => {
      return a - b;
    });

    let marker;
    let sortedVenues = [];
    dists.forEach( dist => {
      marker = new google.maps.Marker({
        position: coordVenues[dist].latLng,
        map: this.map,
        title: coordVenues[dist].venue.name
      });
      sortedVenues.push(coordVenues[dist].venue);
      this.setState({sortedVenues: sortedVenues});
    });
  },
  render(){
    let sortedVenues;
    let venueSelection;

    if(this.state.sortedVenues){
      sortedVenues = this.state.sortedVenues.map( venue => {
        return <NearbyVenueItem venue={venue} key={venue.id}/>;
      });
      venueSelection = sortedVenues.slice(0, 5);
    }

    return(
      <div>
        <div className="nearby-box">
          <div className="nearby-map" ref="nearbyMap">
          </div>
        </div>
        <div className="feed">
          <h3>Venues By Distance</h3>
          <div className="friend-box">
            {venueSelection}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NearbyVenues;

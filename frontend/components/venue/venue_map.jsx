const React = require('react');
const ReactDOM = require('react-dom');
const hashHistory = require('react-router').hashHistory;

const VenueStore = require('../../stores/venue_store');

const VenueMap = React.createClass({
  componentDidUpdate(){
    const mapDOMNode = ReactDOM.findDOMNode(this.refs.map);
    const mapCenter = {lat: this.props.venue.lat,
                       lng: this.props.venue.lng};
    const mapOptions = {
     center: mapCenter,
     zoom: 13};

    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    const marker = new google.maps.Marker({
      position: mapCenter,
      map: this.map,
      title: this.props.venue.name
    });

  },
  render(){
    return(
      <div className="map" ref="map">
      </div>
    );
  }
});

module.exports = VenueMap;

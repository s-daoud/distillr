const Store = require('flux/utils').Store;
const dispatcher = require('../dispatcher/dispatcher');
const VenueConstants = require('../constants/venue_constants');
const hashHistory = require('react-router').hashHistory;

let _venues = {};

const VenueStore = new Store(dispatcher);

VenueStore.all = function () {
  return Object.keys(_venues).map(venue => {
  	return _venues[venue];
  });
};

VenueStore.resetAllVenues = function(venues) {
  _venues = {};
  venues.forEach(venue => {
    _venues[venue.id] = venue;
  });
  this.__emitChange();
};

VenueStore.addVenue = function(venue){
  _venues[venue.id] = venue;
  hashHistory.push(`venues/${venue.id}`);
  this.__emitChange();
};

VenueStore.find = function(id){
  return _venues[id];
};

VenueStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case VenueConstants.VENUES_RECEIVED:
      this.resetAllVenues(payload.venues);
      break;
    case VenueConstants.VENUE_RECEIVED:
      this.addVenue(payload.venue);
      break;
  }
};

module.exports = VenueStore;

const dispatcher = require('../dispatcher/dispatcher');
const VenueConstants = require('../constants/venue_constants');
const VenueApiUtil = require('../util/venue_api_util');
const ErrorActions = require('./error_actions');

const VenueActions = {
  fetchAllVenues(source){
    VenueApiUtil.fetchAllVenues(VenueActions.receiveAllVenues, source);
  },
  fetchSingleVenue(id){
    VenueApiUtil.fetchSingleVenue(id, VenueActions.receiveSingleVenue);
  },
  createVenue(data){
    VenueApiUtil.createVenue("venue", data, VenueActions.receiveSingleVenue, ErrorActions.setErrors);
  },
  receiveAllVenues(venues){
    dispatcher.dispatch({
      actionType: VenueConstants.VENUES_RECEIVED,
      venues: venues
    });
  },
  receiveSingleVenue(venue){
    dispatcher.dispatch({
      actionType: VenueConstants.VENUE_RECEIVED,
      venue: venue
    });
  }
};

module.exports = VenueActions;

module.exports = {
  fetchAllVenues(success, source){
    $.ajax({
      url: "api/venues",
      data: source,
      success(resp){
        success(resp);
      }
    });
  },
  fetchSingleVenue(id, success){
    debugger
    $.ajax({
      url: `api/venues/${id}`,
      success(resp){
        success(resp);
      }
    });
  },
  createVenue(form, data, success, error){
    $.ajax({
      url: "api/venues",
      method: "POST",
      data: {venue: data},
      success(resp){
        success(resp);
      },
      error(resp){
        error(form, resp);
      }
    });
  },
};

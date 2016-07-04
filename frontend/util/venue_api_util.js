module.exports = {
  fetchAllVenues(success){
    $.ajax({
      url: "api/venues",
      success(resp){
        success(resp);
      }
    });
  },
  fetchSingleVenue(id, success){
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

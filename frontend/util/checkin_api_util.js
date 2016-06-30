module.exports = {
  fetchAllCheckins(source, success){
    $.ajax({
      url: "api/checkins",
      data: source,
      success(resp){
        success(resp);
      }
    });
  },
  createCheckin(data, success, error){
    $.ajax({
      url: "api/checkins",
      method: "POST",
      data: {checkin: data},
      success(resp){
        success(resp);
      },
      error(resp){
        error(resp);
      }
    });
  },
  removeCheckin(id, success){
    $.ajax({
      url: `api/checkins/${id}`,
      method: "DELETE",
      success(resp){
        success(resp);
      }
    });
  }
};

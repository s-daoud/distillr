module.exports = {
  createLike(data, success, error){
    $.ajax({
      url: `api/checkins/${data.checkin_id}/likes`,
      method: "POST",
      data: {like: data},
      success(resp){
        success(resp);
      },
      error(resp){
        error(resp);
      }
    });
  },
  removeLike(checkinId, id, success){
    $.ajax({
      url: `api/checkins/${checkinId}/likes/${id}`,
      method: "DELETE",
      success(resp){
        success(resp);
      }
    });
  }
};

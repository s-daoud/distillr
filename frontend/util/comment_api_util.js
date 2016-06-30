module.exports = {
  createComment(data, success, error){
    $.ajax({
      url: `api/checkins/${data.checkin_id}/comments`,
      method: "POST",
      data: {comment: data},
      success(resp){
        success(resp);
      },
      error(resp){
        error(resp);
      }
    });
  },
  removeComment(checkinId, id, success){
    $.ajax({
      url: `api/checkins/${checkinId}/comments/${id}`,
      method: "DELETE",
      success(resp){
        success(resp);
      }
    });
  }
};

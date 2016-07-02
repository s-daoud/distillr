module.exports = {
  fetchAllFriends(userId, success){
    $.ajax({
      url: `api/users/${userId}/friends`,
      success(resp){
        success(resp);
      }
    });
  },
  createFriend(data, success){
    $.ajax({
      url: `api/friends`,
      method: "POST",
      data: {friend: data},
      success(resp){
        success(resp);
      }
    });
  },
  updateFriend(id, success){
    $.ajax({
      url: `api/friends/${id}`,
      method: "PATCH",
      data: {friend: {status: "accepted"}},
      success(resp){
        success(resp);
      }
    });
  },
  removeFriend(id, success){
    $.ajax({
      url: `api/friends/${id}`,
      method: "DELETE",
      success(resp){
        success(resp);
      }
    });
  }
};

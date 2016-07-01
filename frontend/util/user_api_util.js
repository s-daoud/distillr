module.exports = {
  fetchAllUsers(success){
    $.ajax({
      url: "api/users",
      success(resp){
        success(resp);
      }
    });
  },
  fetchSingleUser(id, success){
    $.ajax({
      url: `api/users/${id}`,
      success(resp){
        success(resp);
      }
    });
  }
};

module.exports = {
  signup(form, data, success, error){
    $.ajax({
      url: "api/users",
      method: "POST",
      data: {user: data},
      success(resp) {
        success(resp);
      },
      error(resp){
        error(form, resp);
      }
    });
  },
  login(form, data, success, error){
    $.ajax({
      url: "api/session",
      method: "POST",
      data: {user: data},
      success(resp) {
        success(resp);
      },
      error(resp){
        error(form, resp);
      }
    });
  },
  logout(success, error){
    $.ajax({
      url: "api/session",
      method: "DELETE",
      success(resp) {
        success(resp);
      },
      error(resp){
        error(resp);
      }
    });
  }
};

module.exports = {
  fetchAllDrinks(success){
    $.ajax({
      url: "api/drinks",
      success(resp){
        success(resp);
      }
    });
  },
  fetchSingleDrink(id, success){
    $.ajax({
      url: `api/drinks/${id}`,
      success(resp){
        success(resp);
      }
    });
  },
  createDrink(form, data, success, error){
    $.ajax({
      url: "api/drinks",
      method: "POST",
      data: {drink: data},
      success(resp){
        success(resp);
      },
      error(resp){
        error(form, resp);
      }
    });
  },
};

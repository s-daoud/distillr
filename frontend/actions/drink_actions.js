const dispatcher = require('../dispatcher/dispatcher');
const DrinkConstants = require('../constants/drink_constants');
const DrinkApiUtil = require('../util/drink_api_util');
const ErrorActions = require('./error_actions');

const DrinkActions = {
  fetchAllDrinks(){
    DrinkApiUtil.fetchAllDrinks(DrinkActions.receiveAllDrinks);
  },
  fetchSingleDrink(id){
    DrinkApiUtil.fetchSingleDrink(id, DrinkActions.receiveSingleDrink);
  },
  createDrink(data){
    DrinkApiUtil.createDrink("drink", data, DrinkActions.receiveSingleDrink, ErrorActions.setErrors);
  },
  receiveAllDrinks(drinks){
    dispatcher.dispatch({
      actionType: DrinkConstants.DRINKS_RECEIVED,
      drinks: drinks
    });
  },
  receiveSingleDrink(drink){
    dispatcher.dispatch({
      actionType: DrinkConstants.DRINK_RECEIVED,
      drink: drink
    });
  }
};

module.exports = DrinkActions;

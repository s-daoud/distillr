const Store = require('flux/utils').Store;
const dispatcher = require('../dispatcher/dispatcher');
const DrinkConstants = require('../constants/drink_constants');
const hashHistory = require('react-router').hashHistory;

let _drinks = {};

const DrinkStore = new Store(dispatcher);

DrinkStore.all = function () {
  return Object.keys(_drinks).map(drink => {
  	return _drinks[drink];
  });
};

DrinkStore.resetAllDrinks = function(drinks) {
  _drinks = {};
  drinks.forEach(drink => {
    _drinks[drink.id] = drink;
  });
  this.__emitChange();
};

DrinkStore.addDrink = function(drink){
  _drinks[drink.id] = drink;
  hashHistory.push(`drinks/${drink.id}`);
  this.__emitChange();
};

DrinkStore.find = function(id){
  return _drinks[id];
};

DrinkStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case DrinkConstants.DRINKS_RECEIVED:
      this.resetAllDrinks(payload.drinks);
      break;
    case DrinkConstants.DRINK_RECEIVED:
      this.addDrink(payload.drink);
      break;
  }
};

module.exports = DrinkStore;

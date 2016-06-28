const Store = require('flux/utils').Store;
const dispatcher = require('../dispatcher/dispatcher');
const ErrorConstants = require('../constants/error_constants');

let _errors = {};
let _form = "";

const ErrorStore = new Store(dispatcher);

ErrorStore.formErrors = function(form){
  if (form === _form){
    if(_errors.base instanceof Array) {
        return _errors.base;
    } else {
      return _errors.base.password.concat(_errors.base.username);
    }
  }
};

ErrorStore.form = function(){
  return _form;
};

ErrorStore.setErrors = function(form, errors){
  _form = form;
  _errors = errors;
  this.__emitChange();
};

ErrorStore.clearErrors = function(){
  _form = "";
  _errors = {};
  this.__emitChange();
};

ErrorStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case ErrorConstants.SET_ERRORS:
      this.setErrors(payload.form, payload.error);
      break;
    case ErrorConstants.CLEAR_ERRORS:
      this.clearErrors();
      break;
  }
};

module.exports = ErrorStore;

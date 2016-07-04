const dispatcher = require('../dispatcher/dispatcher');
const ErrorConstants = require('../constants/error_constants');

const ErrorActions = {
  setErrors(form, error){
    dispatcher.dispatch({
      actionType: ErrorConstants.SET_ERRORS,
      error: error.responseJSON,
      form: form
    });
  },
  clearErrors(error){
    dispatcher.dispatch({
      actionType: ErrorConstants.CLEAR_ERRORS,
      error: error.responseJSON
    });
  }
};

module.exports = ErrorActions;

const React = require('react');
const hashHistory = require('react-router').hashHistory;
const Rating = require('react-rating');

const ErrorStore = require('../../stores/error_store');
const SessionStore = require('../../stores/session_store');
const DrinkStore = require('../../stores/drink_store');
const CheckinActions = require('../../actions/checkin_actions');

const CheckinIndex = require('./checkin_index');
const FriendRequestIndex = require('../user/friend_request_index');

const CheckinForm = React.createClass({
  getInitialState(){
    return ({drink: "", drinkList: {}, rating: "", initialRating: 0,
            review: "", focused: false, errors: ErrorStore.formErrors("checkin")});
  },
  componentDidMount(){
    this.errorListener = ErrorStore.addListener(this.trackErrors);
  },
  componentWillUnmount(){
    this.errorListener.remove();
  },
  trackErrors(){
    this.setState({errors: ErrorStore.formErrors("checkin")});
  },
  updateDrink(e){
    e.preventDefault();
    const drinks = {};
    this.allDrinks = DrinkStore.all();
    Object.keys(this.allDrinks).forEach( id => {
      if (this.allDrinks[id].name.toLowerCase().includes(e.target.value.toLowerCase())) {
        drinks[id] = this.allDrinks[id];
      }
    });
    this.setState({drink: e.target.value, drinkList: drinks, focused: true});
  },
  autoDrink(e){
    e.preventDefault();
    const drink = {};
    Object.keys(this.allDrinks).forEach( drinkId => {
      if (this.allDrinks[drinkId].name === (e.target.className)) {
        drink[drinkId] = this.allDrinks[drinkId];
      }
    });
    this.setState({drink: e.target.className, drinkList: drink, focused: false});
  },
  updateRating(rating){
    this.setState({rating: rating});
  },
  updateInitial(rating){
    this.setState({initialRating: rating});
  },
  updateReview(e){
    e.preventDefault();
    this.setState({review: e.target.value});
  },
  handleSubmit(e){
    e.preventDefault();
    const drinkId = this.state.drinkList[Object.keys(this.state.drinkList)[0]].id;
    CheckinActions.createCheckin({user_id: SessionStore.currentUser().id,
                                  drink_id: parseInt(drinkId),
                                  rating: parseInt(this.state.rating),
                                  review: this.state.review});
    this.setState({drink: "", rating: "", review: "", initialRating: 0});
  },
  focus(e){
    e.preventDefault();
    this.setState({focused: true});
  },
  blur(e){
    e.preventDefault();
    this.setState({focused: false});
  },
  render(){
    let errors = "";
    if(this.state.errors){
      errors = this.state.errors.map(error => {
        return (<div className="error" key={error}>{error}<br/></div>);
      });
    }
    let drinkList = this.state.drinkList;

    const drinkDropdown = Object.keys(drinkList).map( drinkId => {
      return <li key={drinkList[drinkId].id}
                 className={drinkList[drinkId].name}
                 onMouseDown={this.autoDrink}>{drinkList[drinkId].name}
             </li>;
    });

    let className = "drink-dropdown";
    if (this.state.focused){
      className += " focus";
    }

    return (
      <div>
        <div className="checkin-form">
          {errors}
          <form onSubmit={this.handleSubmit} className="form" id="checkin">
            <input type="text" onFocus={this.focus} onBlur={this.blur}
                   onChange={this.updateDrink} value={this.state.drink}
                   placeholder="Drink" id="checkin-drink"/>
            <ul onMouseOver={this.focus} className={className}>{drinkDropdown}</ul>

            <div>
              <Rating initialRate={this.state.initialRating}
                      empty="fa fa-glass grey fa-2x" full="fa fa-glass gold fa-2x"
                      onChange={this.updateRating} onClick={this.updateInitial}/>
            </div>

            <textarea onChange={this.updateReview} value={this.state.review}
                      placeholder="Review (optional)" rows="2" cols="30"/> <br />
            <input type="submit" value="Check in!" id="checkin-button"/>
          </form>
        </div>
        <div className="main-flex">
          <div className="checkin-flex">
            <CheckinIndex source={{loc: "feed", id: SessionStore.currentUser().id}}/>
          </div>
          <div className="friend-flex">
            <FriendRequestIndex />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CheckinForm;

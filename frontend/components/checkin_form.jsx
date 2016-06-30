const React = require('react');
const CheckinActions = require('../actions/checkin_actions');
const hashHistory = require('react-router').hashHistory;
const ErrorStore = require('../stores/error_store');
const SessionStore = require('../stores/session_store');
const DrinkStore = require('../stores/drink_store');
import {RadioGroup, Radio} from 'react-radio-group'

const CheckinForm = React.createClass({
  getInitialState(){
    return ({drink: "", drinkList: {}, rating: "",
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
    this.setState({drink: e.target.value, drinkList: drinks});
  },
  autoDrink(e){
    e.preventDefault();
    console.log("hi");
    const drink = {};
    Object.keys(this.allDrinks).forEach( drinkId => {
      if (this.allDrinks[drinkId].name === (e.target.className)) {
        drink[drinkId] = this.allDrinks[drinkId];
      }
    });
    this.setState({drink: e.target.className, drinkList: drink, focused:false});
  },
  updateRating(val){
    this.setState({rating: val})
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
    this.setState({drink: "", rating: "", review: ""});
  },
  focus(e){
    e.preventDefault();
    this.setState({focused: true});
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
                 onClick={this.autoDrink}>{drinkList[drinkId].name}
             </li>;
    });

    let className = "drink-dropdown";
    if (this.state.focused){
      className += " focus";
    }

    return (
      <div>
        {errors}
        <form onSubmit={this.handleSubmit} className="form" id="checkin">
          <input type="text" onFocus={this.focus}
                 onChange={this.updateDrink} value={this.state.drink} placeholder="Drink" />
          <ul className={className}>{drinkDropdown}</ul>

          <RadioGroup name="rating" onChange={this.updateRating}>
            <Radio value="1" />1
            <Radio value="2" />2
            <Radio value="3" />3
            <Radio value="4" />4
            <Radio value="5" />5
          </RadioGroup>

          <textarea onChange={this.updateReview} placeholder="Review (optional)" rows="2" cols="50"/> <br />
          <input type="submit" value="Check in!"/>
        </form>
      </div>
    );
  }
});

module.exports = CheckinForm;

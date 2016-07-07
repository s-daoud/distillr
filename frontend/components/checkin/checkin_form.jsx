const React = require('react');
const hashHistory = require('react-router').hashHistory;
const Rating = require('react-rating');

const ErrorStore = require('../../stores/error_store');
const SessionStore = require('../../stores/session_store');
const DrinkStore = require('../../stores/drink_store');
const VenueStore = require('../../stores/venue_store');
const UserStore = require('../../stores/user_store');
const CheckinActions = require('../../actions/checkin_actions');
const DrinkActions = require('../../actions/drink_actions');
const VenueActions = require('../../actions/venue_actions');

const CheckinIndex = require('./checkin_index');
const FriendRequestIndex = require('../user/friend_request_index');
const UserInfoBox = require('../user/user_info_box');

const CheckinForm = React.createClass({
  getInitialState(){
    return ({drink: "", drinkList: {}, venue: "", venueList: {},
            rating: "", initialRating: 0, review: "", focused: false, venueFocused: false,
            errors: ErrorStore.formErrors("checkin"), user: SessionStore.currentUser()});
  },
  componentDidMount(){
    this.errorListener = ErrorStore.addListener(this.trackErrors);
    this.userListener = UserStore.addListener(this._onChange);
    DrinkActions.fetchAllDrinks();
    VenueActions.fetchAllVenues();
  },
  componentWillUnmount(){
    this.errorListener.remove();
    this.userListener.remove();
  },
  trackErrors(){
    this.setState({errors: ErrorStore.formErrors("checkin")});
  },
  _onChange(){
    this.setState({user: UserStore.find(this.state.user.id)});
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
  updateVenue(e){
    e.preventDefault();
    const venues = {};
    this.allVenues = VenueStore.all();
    Object.keys(this.allVenues).forEach( id => {
      if (this.allVenues[id].name.toLowerCase().includes(e.target.value.toLowerCase())) {
        venues[id] = this.allVenues[id];
      }
    });
    this.setState({venue: e.target.value, venueList: venues, venueFocused: true});
  },
  autoVenue(e){
    e.preventDefault();
    const venue = {};
    Object.keys(this.allVenues).forEach( venueId => {
      if (this.allVenues[venueId].name === (e.target.className)) {
        venue[venueId] = this.allVenues[venueId];
      }
    });
    this.setState({venue: e.target.className, venueList: venue, venueFocused: false});
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
    let drinkId;
    let venueId;
    if (Object.keys(this.state.drinkList).length !== 0 && this.state.drinkList.constructor === Object) {
      drinkId = this.state.drinkList[Object.keys(this.state.drinkList)[0]].id;
    }
    if (Object.keys(this.state.venueList).length !== 0 && this.state.venueList.constructor === Object) {
      venueId = this.state.venueList[Object.keys(this.state.venueList)[0]].id;
    }
    CheckinActions.createCheckin({user_id: SessionStore.currentUser().id,
                                  drink_id: parseInt(drinkId),
                                  venue_id: parseInt(venueId),
                                  rating: parseInt(this.state.rating),
                                  review: this.state.review});
    this.setState({drink: "", drinkList: {}, venue: "", venueList: {}, rating: "", review: "", initialRating: 0});
  },
  focus(e){
    e.preventDefault();
    this.setState({focused: true});
  },
  blur(e){
    e.preventDefault();
    this.setState({focused: false});
  },
  venueFocus(e){
    e.preventDefault();
    this.setState({venueFocused: true});
  },
  venueBlur(e){
    e.preventDefault();
    this.setState({venueFocused: false});
  },
  render(){
    let errors = "";
    if(this.state.errors){
      errors = this.state.errors.map(error => {
        return (<div className="checkin-error" key={error}>{error}<br/></div>);
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

    let venueList = this.state.venueList;

    const venueDropdown = Object.keys(venueList).map( venueId => {
      return <li key={venueList[venueId].id}
                 className={venueList[venueId].name}
                 onMouseDown={this.autoVenue}>{venueList[venueId].name}
             </li>;
    });

    let venueClassName = "drink-dropdown venue-dropdown";
    if (this.state.venueFocused){
      venueClassName += " focus";
    }
    return (
      <div className="main-flex">
        <div className="checkin-flex">
          <div className="feed">
            <h3>Check In</h3>
            <div className="checkin-item">
              {errors}
              <form onSubmit={this.handleSubmit} className="form" id="checkin" autoComplete="off">
                <input type="text" onFocus={this.focus} onBlur={this.blur}
                       onChange={this.updateDrink} value={this.state.drink}
                       placeholder="Drink" id="checkin-drink"/>
                <ul onMouseOver={this.focus} className={className}>{drinkDropdown}</ul>

                <input type="text" onFocus={this.venueFocus} onBlur={this.venueBlur}
                       onChange={this.updateVenue} value={this.state.venue}
                       placeholder="Venue (optional)"/>
                <ul onMouseOver={this.venueFocus} className={venueClassName}>{venueDropdown}</ul>

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
          </div>
          <CheckinIndex source={{loc: "feed", id: SessionStore.currentUser().id}}/>
        </div>
        <div className="friend-flex">
          <UserInfoBox user={this.state.user} />
          <FriendRequestIndex />
        </div>
      </div>
    );
  }
});

module.exports = CheckinForm;

const React = require('react');
const hashHistory = require('react-router').hashHistory;

const UserStore = require('../stores/user_store');
const DrinkStore = require('../stores/drink_store');
const VenueStore = require('../stores/venue_store');
const UserActions = require('../actions/user_actions');
const DrinkActions = require('../actions/drink_actions');
const VenueActions = require('../actions/venue_actions');

const Search = React.createClass({
  getInitialState(){
    return {drinkList: {}, venueList: {}, userList: {}, search: "", focused: false};
  },
  componentDidMount(){
    UserActions.fetchAllUsers();
    DrinkActions.fetchAllDrinks();
    VenueActions.fetchAllVenues();
  },
  focus(e){
    e.preventDefault();
    this.setState({focused: true});
  },
  blur(e){
    e.preventDefault();
    this.setState({focused: false});
  },
  updateSearch(e){
    e.preventDefault();
    const users = {};
    const drinks = {};
    const venues = {};
    this.allUsers = UserStore.all();
    this.allDrinks = DrinkStore.all();
    this.allVenues = VenueStore.all();
    Object.keys(this.allUsers).forEach( id => {
      if (this.allUsers[id].username.toLowerCase().includes(e.target.value.toLowerCase())) {
        users[id] = this.allUsers[id];
      }
    });
    Object.keys(this.allDrinks).forEach( id => {
      if (this.allDrinks[id].name.toLowerCase().includes(e.target.value.toLowerCase())) {
        drinks[id] = this.allDrinks[id];
      }
    });
    Object.keys(this.allVenues).forEach( id => {
      if (this.allVenues[id].name.toLowerCase().includes(e.target.value.toLowerCase())) {
        venues[id] = this.allVenues[id];
      }
    });
    this.setState({search: e.target.value, drinkList: drinks, userList: users, venueList: venues, focused: true});
  },
  autoUser(userId){
    hashHistory.push(`users/${userId}`);
  },
  autoDrink(drinkId){
    hashHistory.push(`drinks/${drinkId}`);
  },
  autoVenue(venueId){
    hashHistory.push(`venues/${venueId}`);
  },
  handleSubmit(){
    if (Object.keys(this.state.drinkList).length !== 0 && this.state.drinkList.constructor === Object) {
      hashHistory.push(`drinks/${this.state.drinkList[Object.keys(this.state.drinkList)[0]].id}`);
    } else if (Object.keys(this.state.venueList).length !== 0 && this.state.venueList.constructor === Object) {
      hashHistory.push(`venues/${this.state.venueList[Object.keys(this.state.venueList)[0]].id}`);
    } else if (Object.keys(this.state.userList).length !== 0 && this.state.userList.constructor === Object) {
      hashHistory.push(`users/${this.state.userList[Object.keys(this.state.userList)[0]].id}`);
    }
  },
  render(){
    let drinkList = this.state.drinkList;
    const drinkDropdown = Object.keys(drinkList).map( drinkId => {
      return <li key={drinkList[drinkId].name}
                 className={drinkList[drinkId].name}
                 onMouseDown={this.autoDrink.bind(null, drinkList[drinkId].id)}>{drinkList[drinkId].name}
             </li>;
    });

    let venueList = this.state.venueList;

    const venueDropdown = Object.keys(venueList).map( venueId => {
      return <li key={venueList[venueId].name}
                 className={venueList[venueId].name}
                 onMouseDown={this.autoVenue.bind(null, venueList[venueId].id)}>{venueList[venueId].name}
             </li>;
    });

    let userList = this.state.userList;

    const userDropdown = Object.keys(userList).map( userId => {
      return <li key={userList[userId].username}
                 className={userList[userId].username}
                 onMouseDown={this.autoUser.bind(null, userList[userId].id)}>{userList[userId].username}
             </li>;
    });

    let className = "drink-dropdown";
    if (this.state.focused){
      className += " focus";
    }

    let allDropdowns = drinkDropdown.concat(venueDropdown).concat(userDropdown);

    return (
      <div>
        <form onSubmit={this.handleSubmit} autoComplete="off" className="form">
          <input type="text" onFocus={this.focus} onBlur={this.blur}
                 onChange={this.updateSearch} value={this.state.search}
                 placeholder="Search" id="search"/>
          <ul onMouseOver={this.focus} className={className}>{allDropdowns}</ul>
        </form>
      </div>
    );
  }
});

module.exports = Search;

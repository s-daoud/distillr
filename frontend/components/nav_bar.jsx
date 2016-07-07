const React = require('react');
const hashHistory = require('react-router').hashHistory;
const Modal = require('react-modal');

const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');

const DrinkForm = require('./drink/drink_form');
const VenueForm = require('./venue/venue_form');
const Search = require('./search');

const NavBar = React.createClass({
  getInitialState(){
    return {modalOpen: false};
  },
  goToFeed(e){
    e.preventDefault();
    hashHistory.push("index");
  },
  goToProfile(e){
    e.preventDefault();
    hashHistory.push(`users/${SessionStore.currentUser().id}`);
  },
  goToFriends(e){
    e.preventDefault();
    hashHistory.push("friends");
  },
  goToNearby(e){
    e.preventDefault();
    hashHistory.push("nearby");
  },
  goToTopRated(e){
    e.preventDefault();
    hashHistory.push("top_rated");
  },
  addDrink(e){
    e.preventDefault();
    this.modalComponent = <DrinkForm closeModal={this.closeModal}/>;
    this.openModal();
  },
  addVenue(e){
    e.preventDefault();
    this.modalComponent = <VenueForm closeModal={this.closeModal}/>;
    this.openModal();
  },
  closeModal(){
    this.setState({modalOpen: false});
  },
  openModal(){
    this.setState({modalOpen: true});
  },
  render(){
    return (
      <div>
        <header>
          <div className="navbar">
            <ul className="left-header">
              <li className="logo" onClick={this.goToFeed}>

              </li>
              <ul className="header-list">
                  <li className="clickable" onClick={this.addDrink}>
                    Add Drink
                  </li>
                  <li className="clickable" onClick={this.addVenue}>
                    Add Venue
                  </li>
                  <li className="clickable" onClick={this.goToNearby}>
                    Nearby Venues
                  </li>
                  <li className="clickable" onClick={this.goToTopRated}>
                    Top Rated
                  </li>
                  <li>
                    <Search />
                  </li>
              </ul>
            </ul>
            <Modal isOpen={this.state.modalOpen}
                   onRequestClose={this.closeModal}
                   className="modal">
              {this.modalComponent}
            </Modal>
            <ul className="header-list">
                <a href="#">
                <li className="dropdown">
                  {SessionStore.currentUser().username}&nbsp;&nbsp;<i className="fa fa-caret-down"></i>
                  <ul className="dropdown-list">
                    <li onClick={this.goToFeed}>
                      Recent Activity
                    </li>
                    <li onClick={this.goToProfile}>
                      My Profile
                    </li>
                    <li onClick={this.goToFriends}>
                      Friends
                    </li>
                    <li onClick={SessionActions.logout}>
                      Log Out
                    </li>
                  </ul>
                </li>
              </a>
            </ul>
          </div>
        </header>
      </div>

    );
  }
});

module.exports = NavBar;

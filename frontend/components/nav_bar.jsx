const React = require('react');
const hashHistory = require('react-router').hashHistory;
const Modal = require('react-modal');

const DrinkActions = require('../actions/drink_actions');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');

const DrinkForm = require('./drink/drink_form');

const NavBar = React.createClass({
  getInitialState(){
    return {modalOpen: false};
  },
  componentDidMount(){
    DrinkActions.fetchAllDrinks();
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
                  <li className="clickable" onClick={this.openModal}>
                    Add Drink
                    <Modal isOpen={this.state.modalOpen}
                           onRequestClose={this.closeModal}
                           className="modal">
                      <DrinkForm />
                    </Modal>
                  </li>
              </ul>
            </ul>
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

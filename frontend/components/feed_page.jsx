const React = require('react');
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory;

const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');

const DrinkActions = require('../actions/drink_actions');
const DrinkForm = require('./drink_form');

const CheckinIndex = require('./checkin_index');

const FeedPage = React.createClass({
  componentDidMount(){
    DrinkActions.fetchAllDrinks();
  },
  goToFeed(e){
    e.preventDefault();
    hashHistory.push('index');
  },
  render(){
    return (
      <div>
        <header>
          <div className="navbar">
            <ul className="left-header">
              <li className="logo">
                <Link to="index">Distillr</Link>
              </li>
              <ul className="header-list">
                  <li className="dropdown">
                    Add Drink
                    <ul className="dropdown-list drink-form">
                      <li>
                        <DrinkForm className="drink-form-element"/>
                      </li>
                    </ul>
                  </li>
              </ul>
            </ul>
            <ul className="header-list">
              <a href="#">
                <li className="dropdown">{SessionStore.currentUser().username}
                  <ul className="dropdown-list">
                    <li onClick={this.goToFeed}>
                      Recent Activity
                    </li>
                    <li>
                      My Profile
                    </li>
                    <li>
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

module.exports = FeedPage;

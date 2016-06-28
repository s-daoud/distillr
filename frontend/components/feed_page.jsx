const React = require('react');
const Link = require('react-router').Link;

const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');

const FeedPage = React.createClass({
  render(){
    return (
      <div>
        <header>
          <div className="navbar">
            <div className="logo"><Link to="index">Distillr</Link></div>
            <ul className="header-list">
              <a href="#">
                <li className="dropdown">{SessionStore.currentUser()}
                  <ul className="dropdown-list">
                    <li>
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

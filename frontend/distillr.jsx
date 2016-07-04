const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
const Modal = require('react-modal');

const SessionStore = require('./stores/session_store');
const SessionActions = require('./actions/session_actions');

const LoginForm = require('./components/splash/login_form');
const SignupForm = require('./components/splash/signup_form');

const SplashPage = require('./components/splash/splash_page');
const NavBar = require('./components/nav_bar');
const DrinkPage = require('./components/drink/drink_page');
const CheckinForm = require('./components/checkin/checkin_form');
const ProfilePage = require('./components/user/profile_page');
const FriendIndex = require('./components/user/friend_index');
const VenuePage = require('./components/venue/venue_page');
const NearbyVenues = require('./components/venue/nearby_venues');

const _ensureLoggedIn = function(nextState, replace){
  if (!SessionStore.isUserLoggedIn()){
    replace("login");
  }
};

const requireAnonymous = function(nextState, replace){
  if (SessionStore.isUserLoggedIn()){
    replace("index");
  }
};

const App = React.createClass({
  render(){
    let nav = (<div></div>);

    if(this.props.location.pathname !== "/"){
      nav = <NavBar />;
    }

    return (
      <div className="app-container">
        {nav}
        {this.props.children}
      </div>
    );
  }
});

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SplashPage} onEnter={requireAnonymous}/>
      <Route component={SignupForm} path="signup" />
      <Route component={LoginForm} path="login" />
      <Route component={CheckinForm} path="index" onEnter={_ensureLoggedIn}/>
      <Route component={ProfilePage} path="users/:userId" />
      <Route component={DrinkPage} path="drinks/:drinkId" />
      <Route component={FriendIndex} path="friends" />
      <Route component={VenuePage} path="venues/:venueId" />
      <Route component={NearbyVenues} path="nearby" />
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
  SessionActions.receiveUser(window.currentUser);
  Modal.setAppElement(document.body);
  ReactDOM.render(
    routes,
    document.getElementById('content')
  );
});

const React = require('react');
const ReactDOM = require('react-dom');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
const Link = ReactRouter.Link;
const Modal = require('react-modal');

const LoginForm = require('./components/login_form');
const SignupForm = require('./components/signup_form');
const SessionStore = require('./stores/session_store');
const SessionActions = require('./actions/session_actions');

const SplashPage = require('./components/splash_page');
const NavBar = require('./components/nav_bar');
const DrinkPage = require('./components/drink_page');
const CheckinForm = require('./components/checkin_form');
const ProfilePage = require('./components/profile_page');
const FriendIndex = require('./components/friend_index');

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

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
const FeedPage = require('./components/feed_page');

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

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={SplashPage} onEnter={requireAnonymous}/>
    <Route component={FeedPage} path="index" onEnter={_ensureLoggedIn}/>
    <Route component={LoginForm} path="login" />
    <Route component={SignupForm} path="signup" />
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
  SessionActions.receiveCurrentUser(window.currentUser);
  Modal.setAppElement(document.body);
  ReactDOM.render(
    routes,
    document.getElementById('content')
  );
});

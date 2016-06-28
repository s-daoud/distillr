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

const FeedPage = require('./components/feed_page');

const SplashPage = React.createClass({
  getInitialState(){
    return {user: SessionStore.currentUser(), modalOpen: false};
  },
  componentDidMount(){
    this.sessionListener = SessionStore.addListener(this._onChange);
  },
  componentWillUnmount(){
    this.sessionListener.remove();
  },
  _onChange(){
    this.setState({user: SessionStore.currentUser()});
  },
  guestLogin(e){
    e.preventDefault();
    SessionActions.login({username: "Guest", password: "password"});
  },
  login(e){
    e.preventDefault();
    this.modalComponent = <LoginForm />;
    this.openModal();
  },
  signup(e){
    e.preventDefault();
    this.modalComponent = <SignupForm />;
    this.openModal();
  },
  closeModal(){
    this.setState({modalOpen: false});
  },
  openModal(){
    this.setState({modalOpen: true});
  },
  render() {
    return (
      <div className="main">
        <div className="splash-nav">
          <h1>Distillr</h1>
          <div className="buttons">
            <button className="padded-button" onClick={this.login}>Log in</button><br />
            <button className="padded-button" onClick={this.signup}>Sign up</button><br />
          </div>

          <button id="guest" onClick={this.guestLogin}>Or sign in as guest</button>

          <Modal isOpen={this.state.modalOpen} onRequestClose={this.closeModal}
                  className="modal">
            {this.modalComponent}
          </Modal>
        </div>
      </div>
    );
  }
});

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

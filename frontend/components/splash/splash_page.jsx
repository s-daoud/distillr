const React = require('react');
const Modal = require('react-modal');

const SessionStore = require('../../stores/session_store');
const SessionActions = require('../../actions/session_actions');

const LoginForm = require('./login_form');
const SignupForm = require('./signup_form');

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
      <div className="container">
        <div className="main">
          <div className="splash-logo"></div>
          <div className="splash-nav">
            <div className="tagline">
              <h2>discover</h2>
              <h2>share</h2>
              <h2>drink</h2>
            </div>
            <div className="buttons">
              <button className="padded-button"
                      onClick={this.login}>Log in</button><br />
              <button className="padded-button"
                      onClick={this.signup}>Sign up</button><br />
            </div>

            <button id="guest"
                    onClick={this.guestLogin}>Or sign in as guest</button>

            <Modal isOpen={this.state.modalOpen}
                   onRequestClose={this.closeModal}
                   className="modal">
              {this.modalComponent}
            </Modal>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SplashPage;

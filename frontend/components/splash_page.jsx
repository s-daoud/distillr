const React = require('react');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const Modal = require('react-modal');

const LoginForm = require('../components/login_form');
const SignupForm = require('../components/signup_form');

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
          <div className="splash-nav">
            <h1>Distillr</h1>
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
        <div className="splash-info">
          <div>
            Share the cocktails you're drinking and see what your friends are drinking too!
          </div>
          <div>
            Discover new drinks and bars! Not sure what's good? Check out what people have rated a drink!
          </div>
        </div>
      </div>
    );
  }
});
 
module.exports = SplashPage;

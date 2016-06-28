const React = require('react');
const SessionActions = require('../actions/session_actions');
const hashHistory = require('react-router').hashHistory;
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');

const LoginForm = React.createClass({
  getInitialState(){
    return ({username: "", password: "", errors: ErrorStore.formErrors("login")});
  },
  componentDidMount(){
    this.errorListener = ErrorStore.addListener(this.trackErrors);
    this.sessionListener = SessionStore.addListener(this.checkLogin);
  },
  componentWillUnmount(){
    this.errorListener.remove();
    this.sessionListener.remove();
  },
  trackErrors(){
    this.setState({errors: ErrorStore.formErrors("login")});
  },
  checkLogin(){
    if(SessionStore.isUserLoggedIn){
      hashHistory.push("index");
    }
  },
  updateName(e){
    e.preventDefault();
    this.setState({username: e.target.value});
  },
  updatePassword(e){
    e.preventDefault();
    this.setState({password: e.target.value});
  },
  handleSubmit(e){
    e.preventDefault();
    SessionActions.login({username: this.state.username, password: this.state.password});
  },
  render(){
    let errors = "";
    if(this.state.errors){
      errors = this.state.errors.map(error => {
        return (<div className="error" key={error}>{error}<br/></div>);
      });
    }

    return (
      <div>
        {/*<h3>Log In</h3>*/}
        {errors}
        <form onSubmit={this.handleSubmit} className="form">
          <input type="text" onChange={this.updateName} placeholder="Username"/> <br />
          <input type="password" onChange={this.updatePassword} placeholder="Password"/> <br />
          <input type="submit" value="Log In" className="entry"/>
        </form>
      </div>
    );
  }
});

module.exports = LoginForm;

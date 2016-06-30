const React = require('react');
const DrinkActions = require('../actions/drink_actions');
const hashHistory = require('react-router').hashHistory;
const ErrorStore = require('../stores/error_store');

const DrinkForm = React.createClass({
  getInitialState(){
    return ({name: "", description: "", image_url: "", errors: ErrorStore.formErrors("drink")});
  },
  componentDidMount(){
    this.errorListener = ErrorStore.addListener(this.trackErrors);
  },
  componentWillUnmount(){
    this.errorListener.remove();
  },
  trackErrors(){
    this.setState({errors: ErrorStore.formErrors("drink")});
  },
  updateName(e){
    e.preventDefault();
    this.setState({name: e.target.value});
  },
  updateDescription(e){
    e.preventDefault();
    this.setState({description: e.target.value});
  },
  updateImage(e){
    e.preventDefault();
    this.setState({image_url: e.target.value});
  },
  handleSubmit(e){
    e.preventDefault();
    DrinkActions.createDrink({name: this.state.name, description: this.state.description, image_url: this.state.image_url});
    this.setState({name: "", description: "", image_url: ""});
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
        {errors}
        <form onSubmit={this.handleSubmit} className="add-form">
          <input type="text" onChange={this.updateName} placeholder="Name"/> <br />
          <input type="text" onChange={this.updateImage} placeholder="Image URL"/> <br />
          <textarea onChange={this.updateDescription} placeholder="Description" rows="5" cols="50"/> <br />
          <input type="submit" value="Create Drink" id="add"/>
        </form>
      </div>
    );
  }
});

module.exports = DrinkForm;

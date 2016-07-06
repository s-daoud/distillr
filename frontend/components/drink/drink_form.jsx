const React = require('react');
const hashHistory = require('react-router').hashHistory;

const ErrorStore = require('../../stores/error_store');
const ErrorActions = require('../../actions/error_actions');
const DrinkActions = require('../../actions/drink_actions');

const DrinkForm = React.createClass({
  getInitialState(){
    return ({name: "", description: "", image_url: "", errors: ErrorStore.formErrors("drink")});
  },
  componentDidMount(){
    this.errorListener = ErrorStore.addListener(this.trackErrors);
    if (this.state.errors) {
      this.state.errors.forEach (error => {
        ErrorActions.clearErrors(error);
      });
    }
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
    cloudinary.openUploadWidget(window.CLOUDINARY_OPTIONS, this.handleImage);
  },
  handleImage(error, images){
    if (!error) {
      this.setState({image_url: images[0].secure_url});
    }
  },
  handleSubmit(e){
    e.preventDefault();
    DrinkActions.createDrink({name: this.state.name, description: this.state.description, image_url: this.state.image_url});
    this.setState({name: "", description: "", image_url: ""});
    this.props.closeModal();
  },
  render(){
    let errors = "";
    if(this.state.errors){
      errors = this.state.errors.map(error => {
        return (<div className="error" key={error}>{error}<br/></div>);
      });
    }

    return (
      <div className="add-form">
        {errors}
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.updateName} placeholder="Name"/> <br />
          <button onClick={this.updateImage} id="add-image">Upload Image</button> <br />
          <textarea onChange={this.updateDescription} placeholder="Description" rows="5" cols="50"/> <br />
          <input type="submit" value="Create Drink" id="add"/>
        </form>
      </div>
    );
  }
});

module.exports = DrinkForm;

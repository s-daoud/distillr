const React = require('react');
const hashHistory = require('react-router').hashHistory;

const ErrorStore = require('../../stores/error_store');
const ErrorActions = require('../../actions/error_actions');
const VenueActions = require('../../actions/venue_actions');

const VenueForm = React.createClass({
  getInitialState(){
    return ({name: "", description: "", errors: ErrorStore.formErrors("venue")});
  },
  componentDidMount(){
    this.errorListener = ErrorStore.addListener(this.trackErrors);
    if (this.state.errors) {
      this.state.errors.forEach (error => {
        ErrorActions.clearErrors(error);
      });
    }
    const input = document.getElementById('address');
    this.autocomplete = new google.maps.places.Autocomplete(input);
  },
  componentWillUnmount(){
    this.errorListener.remove();
  },
  trackErrors(){
    this.setState({errors: ErrorStore.formErrors("venue")});
  },
  updateName(e){
    e.preventDefault();
    this.setState({name: e.target.value});
  },
  updateDescription(e){
    e.preventDefault();
    this.setState({description: e.target.value});
  },
  handleSubmit(e){
    e.preventDefault();
    let place = this.autocomplete.getPlace();
    VenueActions.createVenue({name: this.state.name, description: this.state.description,
                              address: place.formatted_address});
    this.setState({name: "", description: ""});
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
          <input type="text" placeholder="Address" id="address"/> <br />
          <textarea onChange={this.updateDescription} placeholder="Description" rows="5" cols="50"/> <br />
          <input type="submit" value="Create Venue" id="add"/>
        </form>
      </div>
    );
  }
});

module.exports = VenueForm;

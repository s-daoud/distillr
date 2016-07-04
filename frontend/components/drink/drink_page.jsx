const React = require('react');

const DrinkStore = require('../../stores/drink_store');

const CheckinIndex = require('../checkin/checkin_index');

const DrinkPage = React.createClass({
  getInitialState(){
    return {drink: {}};
  },
  componentDidMount(){
    window.scrollTo(0,0);
    this.drinkListener = DrinkStore.addListener(this._onChange);
  },
  componentWillUnmount(){
    this.drinkListener.remove();
  },
  componentWillReceiveProps(newProps){
    const drink = DrinkStore.find(newProps.params.drinkId);
    this.setState({drink: drink});
  },
  _onChange(){
    this.setState({drink: DrinkStore.find(this.props.params.drinkId)});
  },
  render(){
    return(
      <div>
        <div className="drink-profile clearfix">
        <img className="drink-img" src={this.state.drink.image_url} />
          <h3>{this.state.drink.name}</h3>
          <p>{this.state.drink.description}</p>
        </div>
        <CheckinIndex source={{loc: "drink", id: this.props.params.drinkId}}/>
      </div>
    );
  }
});

module.exports = DrinkPage;

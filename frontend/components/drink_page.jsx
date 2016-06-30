const React = require('react');

const DrinkStore = require('../stores/drink_store');
const DrinkActions = require('../actions/drink_actions');

const DrinkPage = React.createClass({
  getInitialState(){
    return {drink: {}};
  },
  componentDidMount(){
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
        {this.state.drink.name} <br />
        {this.state.drink.description} <br />
        <img className="drink-img" src={this.state.drink.image_url} />
      </div>
    );
  }
});

module.exports = DrinkPage;

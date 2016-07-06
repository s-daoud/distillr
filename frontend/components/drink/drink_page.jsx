const React = require('react');
const Rating = require('react-rating');

const DrinkStore = require('../../stores/drink_store');
const DrinkActions = require('../../actions/drink_actions');

const CheckinIndex = require('../checkin/checkin_index');

const DrinkPage = React.createClass({
  getInitialState(){
    return {drink: {}};
  },
  componentDidMount(){
    window.scrollTo(0,0);
    this.drinkListener = DrinkStore.addListener(this._onChange);
    DrinkActions.fetchSingleDrink(this.props.params.drinkId);
  },
  componentWillUnmount(){
    this.drinkListener.remove();
  },
  componentWillReceiveProps(newProps){
    window.scrollTo(0,0);
    const drink = DrinkStore.find(newProps.params.drinkId);
    this.setState({drink: drink});
  },
  _onChange(){
    this.setState({drink: DrinkStore.find(this.props.params.drinkId)});
  },
  render(){
    return(
      <div className="drink-img">
        <div className="venue-flex">
          <div className="venue-sidebar">
            <div className="venue-info">
              <p className="venue-name">{this.state.drink.name}</p>
              <p>{this.state.drink.description}</p>
              <Rating className="venue-rating" placeholderRate={parseFloat(this.state.drink.rating)}
                      fractions={parseInt("10")} empty="fa fa-glass grey fa-2x"
                      placeholder="fa fa-glass red-gold fa-2x" readonly={true}/>
            </div>
            <div className="venue-info">
              <img src={this.state.drink.image_url} />
            </div>
          </div>
          <div className="venue-feed">
            <CheckinIndex source={{loc: "drink", id: this.props.params.drinkId}}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DrinkPage;

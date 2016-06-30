const React = require('react');
const CheckinStore = require('../stores/checkin_store');
const CheckinForm = require('./checkin_form');
const CheckinIndexItem = require('./checkin_index_item');
const CheckinActions = require('../actions/checkin_actions');

const CheckinIndex = React.createClass({
  getInitialState(){
    return {checkins: CheckinStore.all()};
  },
  componentDidMount(){
    this.checkinListener = CheckinStore.addListener(this._onChange);
    CheckinActions.fetchAllCheckins();
  },
  componentWillUnmount(){
    this.checkinListener.remove();
  },
  _onChange(){
    this.setState({checkins: CheckinStore.all()});
  },
  render(){
    return (
      <div>
        <CheckinForm />
        {
          this.state.checkins.reverse().map( checkin => {
            return (
              <CheckinIndexItem key={checkin.id} checkin={checkin}/>
            );
          })
        }
      </div>
    );
  }
});

module.exports = CheckinIndex;

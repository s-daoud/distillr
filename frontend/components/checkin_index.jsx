const React = require('react');
const CheckinStore = require('../stores/checkin_store');
const CheckinIndexItem = require('./checkin_index_item');
const CheckinActions = require('../actions/checkin_actions');

const CheckinIndex = React.createClass({
  getInitialState(){
    return {checkins: CheckinStore.all()};
  },
  componentDidMount(){
    this.checkinListener = CheckinStore.addListener(this._onChange);
    CheckinActions.fetchAllCheckins(this.props.source);
  },
  componentWillUnmount(){
    this.checkinListener.remove();
  },
  componentWillReceiveProps(newProps){
    CheckinActions.fetchAllCheckins(newProps.source);
  },
  _onChange(){
    this.setState({checkins: CheckinStore.all()});
  },
  render(){
    let reversed = this.state.checkins.slice().reverse();

    return (
      <div className="feed">
        <h3>Recent Activity</h3>
        {
          reversed.map( checkin => {
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

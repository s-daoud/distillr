const React = require('react');
const CheckinStore = require('../stores/checkin_store');
const CheckinForm = require('./checkin_form');
const CheckinIndexItem = require('./checkin_index_item');
const CheckinActions = require('../actions/checkin_actions');
const FeedPage = require('./feed_page');

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
              <div>
                <hr />
                <CheckinIndexItem key={checkin.id} checkin={checkin}/>
              </div>);
          })
        }
      </div>
    );
  }
});

module.exports = CheckinIndex;

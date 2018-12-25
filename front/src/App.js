import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Calendar from 'react-calendar';
import SetTime from './components/set_time/SetTime';
import ChooseTime from './components/choose_time';


class App extends Component {
  state = {
    date: new Date().toDateString()
  };
  onChange = date => this.setState({date: new Date(date).toDateString()});
  render() {
    return (
      <div className="App">
        <div>
        <Calendar
          onChange={this.onChange}
          value={new Date(this.state.date)}
        />
        </div>
        <Route path="/schedule" render={() => <SetTime {...this.state} />} />
        <Route path="/" exact render={() => <ChooseTime {...this.state} />} />
      </div>
    );
  }
}

export default App;

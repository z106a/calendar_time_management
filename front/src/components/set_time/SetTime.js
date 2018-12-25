import React, { Fragment } from "react";
import axios from 'axios';
import { url } from "../../config";
import withTime from "../../hoc/withTime";
import SubmitButton from "../forms/Buttons";
import TimeList from './TimeList';

class SetTime extends React.Component {
  state= {
    showIsOk: false
  }
  submitHandler = () => {
    let selected = Array.from(document.getElementsByClassName('selected')).map(el => el.textContent);
    axios.post(`${url}/time/add`, {data: selected, date: this.props.date});
    console.log('submit handler clicked with', selected);
    this.setState({showIsOk: true})
  }
  clicked = () => {
     if (this.state.showIsOk) {
       this.setState({showIsOk: false})
      };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.showIsOk === true && prevProps.date !== this.props.date) {
      this.setState({showIsOk: false});
    }
  }
  
  render() {
    return (
      <Fragment>
        <TimeList 
          date={this.props.date} 
          data={this.props.data}
          clicked={this.clicked}
        />
        {this.state.showIsOk && <div className="info">Обновлено.</div>}
        <SubmitButton submit={this.submitHandler}>Установить</SubmitButton>
      </Fragment>
    );
  }
}

export default withTime(props => `${url}/time/${props.date}`)(SetTime);

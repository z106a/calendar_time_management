import React, { Fragment, Component } from "react";
import withTime from "../../hoc/withTime";
import axios from "axios";
import { url } from "../../config";
import SelectTime from './SelectTime';
import SubmitButton from "../forms/Buttons";
import PhoneInput from "../forms/PhoneInput";
import ContactInput from "../forms/Input.js";
import Error from "../forms/Error.js";

class ChooseTime extends Component {
  constructor(props) {
    super(props);
    console.log(window.localStorage);
    this.state = {
      isVoted: false,
        phoneError: '',
        whoError: '',
        [this.props.date]: !!window.localStorage.getItem(this.props.date),
        date: window.localStorage.getItem('date')
    }
  }

  componentDidMount() {
  }
  componentDidUpdate(prevProps){
    if (this.props.date !== prevProps.date) {
      this.setState({
        isVoted: false, 
        [this.props.date]: !!window.localStorage.getItem(this.props.date),
        who: '',
        phoneError: null,
        whoError: null
      });
    }
  }
  errorHandler = (selected) => {
    let err = {};
    if (!this.state.who) err.whoError = 'Укажите контактное имя';
    if (!this.state.phone) err.phoneError = 'Укажите телефон';
    this.setState(err);
  }
  changeHandler = (e) => {
    this.setState({who: e.target.value})
  }
  phoneChangeHandler = (e) => {
    this.setState({phone: e.target.value})
  }
  submitHandler =  () => {
    let selected = Array.from(document.getElementsByClassName("selected")).map(
      el => el.textContent
    );
    this.errorHandler(selected);
    if (!selected.length || !this.state.who || !this.state.phone) return;
    axios.post(`${url}/time/select`, {
      data: selected[0],
      date: this.props.date,
      who: this.state.who,
      phone: this.state.phone
    }).then((data) => {
      console.log(data);
    })
    .catch(console.log);
    
    window.localStorage.setItem(this.props.date, true);
    this.setState({isVoted: true, [this.props.date]: true, who: null, phone: null});
  };
  render() {
    console.log(this.state);
    console.log(this.props);
    return this.state && this.state.isVoted ? 
      <div className="info">Спасибо. Время установлено.</div>  : 
      this.state && this.state[this.props.date] === true  ?
        <div className="info">Вы уже выбрали время для текущего дня.</div>
     :
      this.props.data.length ?
      <Fragment>
        <div className="info">
          <ContactInput placeholder="Укажите ФИО" onChange={this.changeHandler} />
          <Error txt={this.state.whoError} />
          <PhoneInput onChange={this.phoneChangeHandler} placeholder="Телефон" className="phoneinput"/>
          <Error txt={this.state.phoneError} />
        </div>
        <SelectTime date={this.props.date} data={this.props.data} />
        <SubmitButton submit={this.submitHandler}>Выбрать</SubmitButton>
      </Fragment>
      : <div className="info">Нет доступного времени.</div>
  }
}

export default withTime(props => `${url}/time/${props.date}`)(ChooseTime);

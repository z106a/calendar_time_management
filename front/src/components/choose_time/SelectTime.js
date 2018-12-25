import React from "react";
import PropTypes from "prop-types";
import TimeItem from '../forms/TimeItem';

const SelectTime = props => {
  function clickHandler(e) {
    props.clicked && props.clicked();
    Array.from(document.getElementsByClassName("timeitem")).forEach(el => {
      if (el === e.target) {
        el.classList.toggle("selected");
      } else {
        el.classList.toggle("disabled");
      }
    });
  }
  
  return ( 
    <div className="timeline">
      {
        props.data
        .filter(el => el.isSelected === 0)
        .map((el, idx) => <TimeItem key={idx} time={el.time} clickHandler={clickHandler} />)
      }
    </div>);
};

SelectTime.propTypes = {
  data: PropTypes.array
};

export default SelectTime;

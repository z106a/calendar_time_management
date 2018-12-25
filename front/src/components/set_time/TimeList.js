import React from "react";
import PropTypes from "prop-types";
import TimeItem from '../forms/TimeItem';
import dayTimeList from './generateDay';

const TimeList = props => {
  function clickHandler(e) {
    props.clicked && props.clicked();
    if (!e.target.children[0].hasAttribute('required')) {
      e.target.classList.toggle("selected");
    }
  }
  const createList = () => 
    dayTimeList.map((currTime, idx) => {
      var preCreatedElement = props.data.find(d => d.time === currTime.time);
      return (
        <TimeItem
          key={idx}
          time={currTime.time}
          clickHandler={clickHandler}
          selected={preCreatedElement && preCreatedElement.time}
          isChoosen={preCreatedElement && preCreatedElement.isSelected}
        />
      );
    });
  
  return <div className="timeline">{createList()}</div>;
};

TimeList.propTypes = {
  data: PropTypes.array
};

export default TimeList;

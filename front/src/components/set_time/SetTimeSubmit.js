import React from 'react';

function SetTimeSubmit(props) {
  return (
    <button className="submit" onClick={props.submit}>Set Time</button>
  );
}

export default SetTimeSubmit;
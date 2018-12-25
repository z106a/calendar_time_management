import React from "react";

export default function Item({time, selected = false, isChoosen = false, clickHandler}) {
  let className = selected ? "timeitem selected" : "timeitem";
  return (
    <div className={className} onClick={clickHandler}>
      {time}
      <label required={isChoosen}></label>
    </div>
  );
}
import React from "react";

import "components/DayListItem.scss";

var classNames = require('classnames');

export default function DayListItem(props) {
  // render() {
    // let dayClass = "day-list";
    // if (true) {
    //   dayClass += "__item";
    // }
    // if (props.selected) {
    //   dayClass += "--selected";
    // }
    // if (props.spots === 0) {
    //   dayClass += "--full";
    // }
  // }
  
  var dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": (props.spots === 0)
  });
  
  const formatSpots = function () {
    if (props.spots === 0) {
      return "no spots remaining";
    }
    if (props.spots === 1) {
      return "1 spot remaining";
    }
    return props.spots + " spots remaining";
  }

    return (
      <li className={dayClass} onClick={() => props.setDay(props.name)}>
        <h2 className="text--regular">{props.name}</h2>
        <h3 className="text--light">{formatSpots()}</h3>
      </li>
    );
  
  /*
  else if (props.spots === 1) {
    return (
      <li onClick={() => props.setDay(props.name)}>
        <h2 className={dayClass}>{props.name}</h2>
        <h3 className={"text--light"}>{props.spots} spot remaining</h3>
      </li>);
  }
  else {
    return (
      <li onClick={() => props.setDay(props.name)}>
        <h2 className={dayClass}>{props.name}</h2>
        <h3 className={"text--light"}>{props.spots} spots remaining</h3>
      </li>);
  }
  */

}
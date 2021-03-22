import React from "react";

import "components/InterviewerListItem.scss";

var classNames = require('classnames');

export default function InterviewerListItem(props) {

  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li 
      className={interviewerClass}
      onClick={props.setInterviewer}
      id={props.id}
      name={props.name}
      avatar={props.avatar}
      >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
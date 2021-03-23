import React from "react";
import PropTypes from 'prop-types';

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem.js";

var classNames = require('classnames');

function InterviewerList(props) {

  const parsedInterviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem 
        // id={interviewer.id}
        key={interviewer.id}
        name={interviewer.name} 
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={event => props.setInterviewer(interviewer.id)}
      />
    )
  })

  return (
    
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">
        {parsedInterviewers}
      </ul>
    </section>
    
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;
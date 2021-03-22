import React, { useState, useEffect } from "react";

const axios = require('axios').default;

export function getAppointmentsForDay(state, day) {
  // 1. Get appointment array for day
  console.log(state);
  const foundDay = state.days.find((value) => {
    return value.name === day;
  });
  console.log(foundDay);
  if (!foundDay) {
    return [];
  }
  // 2. Map appointment array from appointment IDs to appointment objects
  return foundDay.appointments.map((id) => {
    return state.appointments[id];
  })
  // 3. Return transformed array
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
}

export function getInterviewersForDay(state, day) {
  
  let dayID = 0;
  if (day === "Monday") {
    dayID = 0;
  } else if (day === "Tuesday") {
    dayID = 1;
  } else if (day === "Wednesday") {
    dayID = 2;
  } else if (day === "Thursday") {
    dayID = 3;
  } else if (day === "Friday") {
    dayID = 4;
  } else if (day === "Saturday") {
    dayID = 5;
  } else if (day === "Sunday") {
    dayID = 6;
  } else {
    return [];
  }

  if (state.days[0] === undefined) {
    return [];
  }
  if (state.days[dayID] === undefined) {
    return [];
  }
  
  console.log(state.days[dayID].appointments);
  let interviewerKeys = state.days[dayID].appointments;
  let interviewersForDay = [];
  for (let i = 0; i < interviewerKeys.length; i++) {
    interviewersForDay.push(state.interviewers[interviewerKeys[i]]);
  }
  return interviewersForDay;
}
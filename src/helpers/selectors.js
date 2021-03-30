import React, { useState, useEffect } from "react";

const axios = require('axios').default;

export function getAppointmentsForDay(state, day) {
  // 1. Get appointment array for day
  const foundDay = state.days.find((value) => {
    return value.name === day;
  });
  if (!foundDay) {
    return [];
  }
  // 2. Map appointment array from appointment IDs to appointment objects
  return foundDay.appointments.map((id) => {
     // 3. Return transformed array
    return state.appointments[id];
  })
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
  // 1. Get appointment array for day
  const foundDay = state.days.find((value) => {
    return value.name === day;
  });
  if (foundDay === undefined || state.days.length === 0) {
    return [];
  }
  // 2. Map interviewers array from interviewer IDs to interviewer objects
  return foundDay.interviewers.map((id) => (
     // 3. Return transformed array
     state.interviewers[id]
  ))
  
}
import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData() {

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const getSpotsCount = function(dayObj, appointments) {
    let count = 0
  
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        count++;
      }
    }
  
    return count;
  }

  const updateSpots = function (dayName, days, appointments) {
    const day = days.find(item => item.name === dayName);
  
    const spots = getSpotsCount(day, appointments);
  
    const newArray = days.map(item => {
      if (item.name === dayName) {
        return { ...item, spots: spots}
      }
      return item;
    })
    return newArray;
  
  };

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    /*
    1. Create a new appointment object
    2. Update appointments object with newly made appointment
    3. Make a request to /api/appointments/:id to update database with interview data
    3.5 Method: PUT, need interview object, id
    4. When the response comes back, update state with setState
    5. Transition to SHOW
    */
    const path = `/api/appointments/${id}`
    const spots = updateSpots(state.day, state.days, appointments);
    
    return axios.put(path, appointment)
    .then(() => {
      setState({...state, appointments, days: spots})
    });

  }

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const spots = updateSpots(state.day, state.days, appointments);

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({...state, appointments, days: spots})
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
  
}


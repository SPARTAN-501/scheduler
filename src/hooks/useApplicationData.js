import { useState, useEffect } from "react";

import axios from "axios";

export default function useApplicationData() {

  useEffect(() => {
    /*
    axios.get("/api/appointments").then(response => {
      console.log(response);
      setDays(response.data);
    })
    */
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      console.log(all[0]); // first
      console.log(all[1]); // second
      console.log(all[2]); // third
    
      const [first, second, third] = all;
    
      console.log(first, second, third);

      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      console.log(state.interviewers);
    });
  }, [])

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => setState(prev => ({ ...prev, days }));

  function bookInterview(id, interview) {
    // console.log(id, interview);
    console.log("ID :", id, "INTERVIEW :", interview);

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
    . When the response comes back, update state with setState
    . Transition to SHOW
    */
    const path = `/api/appointments/${id}`
    
    return axios.put(path, {interview})
    .then(() => setState({...state, appointments}));


    /*
    return setState({
      ...state,
      appointments
    });
    */
  }

  const cancelInterview = function (id) {
    console.log("cancelInterview");
    console.log(`ID: ${id}`);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      console.log("Deleting");
      setState({...state, appointments})
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
  
}


import React, { useState, useEffect } from "react";

import "components/Application.scss";

import Button from "./Button";
import DayListItem from "./DayListItem";
import DayList from "./DayList.js";
import InterviewerListItem from "./InterviewerListItem.js";
import InterviewerList from "components/InterviewerList.js";

import Appointment from "components/Appointment";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Confirm from "components/Appointment/Confirm.js";
import Status from "components/Appointment/Status.js";
import Error from "components/Appointment/Error.js";
import Form from "components/Appointment/Form.js";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import axios from "axios";
// const axios = require('axios').default;

/*
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Archie Cohen",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Maria Boucher",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  }
];
*/

/*
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];
*/

export default function Application(props) {
  // console.log(props);
  // const [name, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({});

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

  const cancelInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, {interview})
    .then(() => setState(...state, appointments));
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        // appointments={dailyAppointments}
      />
    );
  });
  // console.log(apps);

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

  return (
    <main className="layout">
      <section className="sidebar">
        {<div>
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        </div>}
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

import React from "react";
import DayListItem from 'components/DayListItem.js';
import Application from "components/Application.js";

export default function DayList(props){
  const days = props.days.map((day) => {
  return(
    <DayListItem 
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}  />   
  );
  });
  return <ul>{days}</ul>;
}
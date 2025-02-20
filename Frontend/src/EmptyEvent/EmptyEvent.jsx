import React from 'react'
import NoEvents from "../assets/NoEvents.jpg"
import "./EmptyEvent.css";

function EmptyEvent() {
  return (
   <>
      <div className='emptyEvent-container'>
        <img src={NoEvents} alt="" />
        <h2>No Events Found</h2>
        <h2>Start Creating Events</h2>
      </div>
   </>
  )
}

export default EmptyEvent
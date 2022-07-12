import React from "react"
import './Calendar.scss'
import { WeekDays } from "./WeekDays"
import { Table } from "./Table"


const Calendar = ({ props:{table} })=>{
  return(
    <div className="Calendar flex column">

      <WeekDays />

      <Table props={{table}} />
    
    </div>
  )
}

export default Calendar
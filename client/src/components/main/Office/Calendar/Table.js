import React from "react"
import {
  MonthNames,
  GetDay,
  CalendarTable
} from "./CalendarLogic"
import { DayZL } from './DayZL'

export const Table = ({ props:{table} })=>{
  return(
    <>
    {
      CalendarTable(table).map( (day, n)=>{

        let classes = `
          ${parseInt(day.month) === parseInt( GetDay().month ) ? `ActiveMonth` : ``}
          ${(day.weekday === 6 || day.weekday === 0) ? `HoliDay` : ``}
          ${day.active ? `DayActive` : ``} Day flex column start`

        let key = `CalendarDay${n+day.unix}`

        let dayLine = `${day.day} ${MonthNames[parseInt(day.month)]} ${day.year}`

        return(
          <div className={classes} key={key}>

            <div className="DayLine flex">{ dayLine }</div>

            <DayZL props={{day}}/>

          </div>
        )
      })
    }
    </>
  )
}
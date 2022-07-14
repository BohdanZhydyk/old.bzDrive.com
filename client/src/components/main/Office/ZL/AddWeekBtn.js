import React from "react"


export const AddWeekBtn = ({ props:{act, calendar, setCalendar, officeFn} })=>{

  let ADD_WEEK = ()=> officeFn({type:act, calendar, setCalendar})

  return(
    <div className="AddWeekBtn flex end">

      <div className="Btn flex" onClick={ ()=> ADD_WEEK() }>
      {
        act === "MINUS_WEEK"
        ? `otworzyć poprzedni tydzień...`
        : `otworzyć następny tydzień...`
      }
      </div>
      
    </div>
  )
}
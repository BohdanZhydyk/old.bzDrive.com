import React from "react"


export const WeekDays = ()=>{

  const DayNames = ['PON','WTO','ŚRO','CZW','PIĄ','SOB','NIE']
  
  return(
    <>
    {
      DayNames.map( (day, n)=>{

        let classes = `${(n === 5 || n === 6) ? `HoliDay` : ``} Day DayPannel flex`
        let key = `CalendarDays${n}`

        return <div className={classes} key={key}>{ day }</div>
        
      })
    }
    </>
  )
}
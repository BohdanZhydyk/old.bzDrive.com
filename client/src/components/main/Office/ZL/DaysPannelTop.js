import React from "react"


export const DaysPannelTop = ({ props:{lang, translate} })=>{

  const DayNames = translate(lang, "DayNames")
  
  return(
    <div className="Week flex stretch wrap">
    {
      DayNames.map( (day, n)=>{

        let classes = `${(n === 5 || n === 6) ? `HoliDay` : ``} Day DayPannel flex`
        let key = `CalendarDays${n}`

        return <div className={classes} key={key}>{ day.toUpperCase() }</div>
        
      })
    }
    </div>
  )
}
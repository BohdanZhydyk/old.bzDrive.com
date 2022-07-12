import { unixToDateTimeConverter } from "../../../../state/functions"


export const GetDay = ( unix = Date.now() )=>{
  let NewDate = unixToDateTimeConverter( new Date(unix) )
  return {
    unix:     unix,
    weekday:  NewDate.weekday,
    year:     NewDate.year.toString(),
    month:    NewDate.month.toString(),
    day:      NewDate.day < 10 ? `0${NewDate.day}` : `${NewDate.day}`
  }
}

export const Calendar = ()=> {
  
  let slideDay = 0
  let OneDay = 86400000
  let now = GetDay(Date.now() + (OneDay * slideDay) )
  
  let days = [ [{...now, active:true}] ]

  const MinusDay = ()=>{
    days[0].unshift( GetDay(days[0][0].unix - OneDay) )
  }
  const PlusDay = ()=>{
    let LastWeek = days.length - 1
    days[LastWeek].push( GetDay(days[LastWeek][days[LastWeek].length - 1].unix + OneDay) )
  }

  const MinusWeek = ()=>{
    days.unshift( [GetDay(days[0][0].unix - OneDay)] )
    for(let i=0; i<6; i++) MinusDay()
  }
  const PlusWeek = ()=>{
    days.push( [GetDay(days[days.length - 1][days[days.length - 1].length - 1].unix + OneDay)] )
    for(let i=0; i<6; i++) PlusDay()
  }

  if( days[0][0].weekday === 7 ){
    for(let i=1; i<7; i++) MinusDay()
  }
  else{
    while( days[0][0].weekday > 1 ) MinusDay()
    while( days[0][days[0].length - 1].weekday < 7 ) PlusDay()
  }
  // MinusWeek()
  MinusWeek()
  PlusWeek()
  PlusWeek()

  return days

}
import { bzUnixToDateTime, DigLen } from "../../../../state/functions"


export const GetDay = ( unix = Date.now() )=>{
  let NewDate = bzUnixToDateTime( new Date(unix) )
  let weekday = NewDate.weekday
  let year = DigLen(NewDate.year, 4)
  let month = DigLen(NewDate.month, 2)
  let day = DigLen(NewDate.day, 2)
  let YYYYMMDD = parseInt(`${year}${month}${day}`)
  return {unix, YYYYMMDD, weekday, year, month, day}
}

const MinusDay = (days)=>{
  let Day = GetDay(days[0].week[0].unix - 86400000)
  days[0].week.unshift(Day)
}
const PlusDay = (days)=>{
  let Day = GetDay(days[days.length - 1].week[days[days.length - 1].week.length - 1].unix + 86400000)
  days[days.length - 1].week.push(Day)
}
const MinusWeek = (days, MinusDay)=>{
  let Day = GetDay(days[0].week[0].unix - 86400000)
  days.unshift( {table:false, week:[Day]} )
  for(let i=0; i<6; i++) MinusDay(days)
}
const PlusWeek = (days, PlusDay)=>{
  let Day = GetDay(days[days.length - 1].week[days[days.length - 1].week.length - 1].unix + 86400000)
  days.push( {table:false, week:[Day]} )
  for(let i=0; i<6; i++) PlusDay(days)
}

export const Calendar = (minus, plus)=> {
  
  let slideDay = 0 // plus/minus today

  if(minus){ MinusWeek(minus, MinusDay); return minus }
  if(plus){ PlusWeek(plus, PlusDay); return plus }
  
  let days = [ {table:false, week:[{...GetDay(Date.now() + (86400000 * slideDay))}]} ]

  if( days[0].week[0].weekday === 7 ){
    for(let i=1; i<7; i++) MinusDay(days)
  }
  else{
    while( days[0].week[0].weekday > 1 ) MinusDay(days)
    while( days[days.length - 1].week[days[days.length - 1].week.length - 1].weekday < 7 ) PlusDay(days)
  }
  
  // MinusWeek(days, MinusDay)
  PlusWeek(days, PlusDay)
  PlusWeek(days, PlusDay)

  return days

}
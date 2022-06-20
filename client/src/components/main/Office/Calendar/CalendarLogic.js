
export const MonthNames = ['gru','sty','lut','mrz','kwi','maj','cze','lip','sie','wrz','paź','lis']

export const GetDay = ( unix = Date.now() )=>{

  let NewDate = new Date(unix)

  let weekday = NewDate.getDay()
  let year = NewDate.getFullYear()
  let month = (NewDate.getMonth()+1) < 10 ? "0"+(NewDate.getMonth()+1) : NewDate.getMonth()+1
  let day = NewDate.getDate() < 10 ? "0"+NewDate.getDate() : NewDate.getDate()

  let dateTime = {
    unix:     unix,
    weekday:  weekday,
    year:     year.toString(),
    month:    month.toString(),
    day:      day.toString(),
    zl:       []
  }
  return dateTime
}

export const CalendarTable = (table)=> {

  let newTable = []

  let getRandomInt = (min, max)=>{
    //The maximum is exclusive and the minimum is inclusive
    let minimum = Math.ceil(min)
    let maximum = Math.floor(max)
    return ( Math.floor(Math.random() * (maximum - minimum) + minimum) ).toString()
  }

  table.map( (el)=> newTable.push(
    { ...el, color: `rgb(${getRandomInt(50, 230)}, ${getRandomInt(50, 230)}, ${getRandomInt(50, 230)})` }
  ))
  
  let slideDay = 0
  let OneDay = 86400000
  let now = GetDay(Date.now() + (OneDay * slideDay) )
  let days = [ now ]

  const MinusDay = ()=> days.unshift( GetDay(days[0].unix - OneDay) )
  const PlusDay = ()=> days.push( GetDay(days[days.length - 1].unix + OneDay) )

  if( days[0].weekday === 0 ){
    for(let i=1; i<7; i++) MinusDay()
  }
  else{
    while( days[0].weekday > 1 ) MinusDay()
    while( days[days.length - 1].weekday > 0 ) PlusDay()
  }
  for(let i=0; i<14; i++) MinusDay()
  for(let i=0; i<21; i++) PlusDay()

  days.map( (day, n)=> {

    let dayNumber = parseInt( day.year + day.month + day.day )

    for(let i=0; i<newTable.length; i++){

      let fromDate = dayNumber >= parseInt( newTable[i].date.year + newTable[i].date.month + newTable[i].date.day)
      let toDate = dayNumber <= parseInt(newTable[i].dateTo.year + newTable[i].dateTo.month + newTable[i].dateTo.day)
      let toNow = dayNumber <= parseInt( now.year + now.month + now.day)
      let fromNow = dayNumber > parseInt( now.year + now.month + now.day)
      let status = newTable[i].status !== "done"

      let condition1 = fromDate && ( ( toDate || status ) && toNow )
      let condition2 = fromDate && ( toDate && fromNow )

      if( condition1 ){
        days[n].zl = [...days[n].zl, newTable[i]]
      }

      if( condition2 ){
        days[n].zl = [...days[n].zl, newTable[i]]
      }

    }

  })

  return days.map( day=> day === now ? {active:true, ...day} : day)

}
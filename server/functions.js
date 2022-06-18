
exports.unixToDateTimeConverter = ( unix = new Date(Date.now()) )=>{
  let year = unix.getFullYear()
  let month = (unix.getMonth()+1) < 10 ? "0"+(unix.getMonth()+1) : unix.getMonth()+1
  let day = unix.getDate() < 10 ? "0"+unix.getDate() : unix.getDate()
  let hour = unix.getHours() < 10 ? "0"+unix.getHours() : unix.getHours()
  let min = unix.getMinutes() < 10 ? "0"+unix.getMinutes() : unix.getMinutes()
  let sec = unix.getSeconds() < 10 ? "0"+unix.getSeconds() : unix.getSeconds()
  let dateTime = {
    year:   year.toString(),
    month:  month.toString(),
    day:    day.toString(),
    hour:   hour.toString(),
    min:    min.toString(),
    sec:    sec.toString()
  }
  return dateTime
}

exports.getRandomInt = (min, max)=>{
  //The maximum is exclusive and the minimum is inclusive
  let minimum = Math.ceil(min)
  let maximum = Math.floor(max)
  return ( Math.floor(Math.random() * (maximum - minimum) + minimum) ).toString()
}
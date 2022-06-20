import React from "react"


export const DayZL = ({ props:{day} }) =>{

  let zl = day.zl.sort( (a, b)=>{
    let A = parseInt(a.date.year+a.date.month+a.date.day)
    let B = parseInt(b.date.year+b.date.month+b.date.day)
    return (A - B)
  })

  return(
    <>
    {
      zl.map( (zl, n)=> {

        let style = { backgroundColor:zl.color }
        let key = `Zlecenie${ n + zl._id }`
        let line = `${zl.car.brand} ${zl.car.model}`

        return(
          <div className={`zlecenie flex`} style={style} key={key}>
            { line }
          </div>
        )

      })
    }
    </>
  )
}
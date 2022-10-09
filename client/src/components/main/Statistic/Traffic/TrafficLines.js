import React, { useState } from 'react'

import { GroupArrBy } from '../../../../state/functions'
import { UserStat } from './UserStat'


export const TrafficLines = ({ props:{traffic} })=>{

  let topLine = {
    count:"count",
    user:"User",
    IP:{
      country_name:"Country",
      region:"Region",
      postal_code:"Postal code",
      city:"City",
      asn_org:"Provider"
    },
    date:{year:"YYYY", month:"MM", day:"DD"}
  }

  let newTraffic = traffic.map( el=> el.user ? {...el, user:el.user} : {...el, user:el.IP.ip} )

  let lines = GroupArrBy(newTraffic, "user")
    .map( el=>{
      let IP, date = false
      el.value.map( val=>{
        if(!IP && val?.IP?.ip){
          IP = val.IP
          date = val.date.dateTime
        }
      })
      return {count: el.value.length, user: el.key, IP, date}
    })

  return(
    <section className="trafficLines flex column">
    {
      [topLine, ...lines].map( (line, n)=>{
        let key = `TrafficLine${n}`
        return(
          <TrafficLine props={{newTraffic, line, n}} key={key} />
        )
      })
    }
    </section>
  )
}

const TrafficLine = ({ props:{newTraffic, line, n} })=>{

  const [show, setShow] = useState(false)

  let classes = `trafficLine ${n === 0 ? `` : `LineCells`} flex wrap`

  let colorCell = n === 0 ? `colorTop` : (line.count > 9 ? `colorCell` : ``)
  
  let dateTime = `${line.date.year}.${line.date.month}.${line.date.day}`

  let IP = line?.IP
  let addr = `
    ${IP?.country_code ? `[${IP.country_code}], ` : ``}
    ${IP?.country_name ? `${IP.country_name}, ` : ``}
    ${IP?.region ? `${IP.region}, ` : ``}
    ${IP?.postal_code ? `${IP.postal_code}, ` : ``}
    ${IP?.city ? `${IP.city}, ` : ``}
    ${IP?.asn_org ? `${IP.asn_org}` : ``}
  `
  
  let userTraffic = newTraffic.filter( el=> (el?.user ? el.user : el.IP.ip) === line.user )

  return(
    <div className={classes}>
      <span className={`cell cellCount flex ${colorCell}`}>{line.count}</span>
      <span className={`cell cellDateTime flex ${colorCell}`}>{dateTime}</span>
      <span className={`cell cellLogin flex start ${colorCell}`}>{line.user}</span>
      <span className={`cell cellAddr flex start ${colorCell}`} onClick={ ()=>setShow(!show) }>{addr}</span>
      { n !== 0 && show && <UserStat props={{userTraffic}}/> }
    </div>
  )
}
import React, { useState, useEffect } from 'react'

import { ScreenSaver } from '../../All/ScreenSaver'


export const Activity = ({ props:{login, ProFn} })=>{

  const [traffic, setTraffic] = useState(false)

  let topLine = {
    user:{login:"TOP"},
    date:{
      dateTime:{day:"DD", month:"MM", year:"YYYY"}
    },
    IP:{
      ip:"IP", country_code:"Code", country_name:"Country", region:"Region",
      postal_code:"Postal code", city:"City", asn_org:"Provider"
    }
  }

  useEffect( ()=>{ !traffic && ProFn({ type:"GET_TRAFFIC", login, cb:(data)=>setTraffic(data) }) },[])

  console.log(traffic)

  return(
    <section className="ProfileSection">
    {
      !traffic
      ? <ScreenSaver />
      :
      <>
      {
        [topLine, ...traffic].map( (el, n)=>{

          let classes = `TrafficLine ${n === 0 ? `txtOrg bold TopLine` : ``} flex`

          let DD_MM_YYYY = `${el.date.dateTime.day}.${el.date.dateTime.month}.${el.date.dateTime.year}`

          let IP = el.IP
          let addr = `
            ${IP?.country_code ? `[${IP.country_code}], ` : ``}
            ${IP?.country_name ? `${IP.country_name}, ` : ``}
            ${IP?.region ? `${IP.region}, ` : ``}
            ${IP?.postal_code ? `${IP.postal_code}, ` : ``}
            ${IP?.city ? `${IP.city}, ` : ``}
            ${IP?.asn_org ? `${IP.asn_org}` : ``}
          `
          
          return(
            <div className={classes} key={`TrafficLine${el.user.login}${n}`}>
              <span className="DDMMYYYY nowrapTxt flex start">{DD_MM_YYYY}</span>
              <span className="IP nowrapTxt flex start">{el.IP.ip}</span>
              <span className="Addr nowrapTxt flex start">{addr}</span>
            </div>
          )
        })
      }
      </>
    }

    </section>
  )
}
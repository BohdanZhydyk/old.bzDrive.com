import React, { useState } from 'react'


export const TrafficLines = ({ props:{traffic} })=>{

  let lines = [{
    count:"count",
    login:"User",
    IP:{
      country_name:"Country",
      region:"Region",
      postal_code:"Postal code",
      city:"City",
      asn_org:"Provider"
    },
    date:{year:"YYYY", month:"MM", day:"DD"}
  }]

  let isUser = (login, IP, date)=>{

    if(IP.host === "localhost") return

    let newIsUser = lines.filter( el=> el.login === login)

    newIsUser.length < 1
    ? lines.push( {login, count:1, IP, date} )
    : lines.map( el=> el.login === login ? el.count = (el.count + 1) : el )

  }

  for(let i=0; i<traffic.length; i++){
    traffic[i]?.user?.login
    ? traffic[i]?.user?.login && isUser(traffic[i].user.login, traffic[i].IP, traffic[i].date.dateTime)
    : traffic[i]?.IP?.ip && isUser(traffic[i].IP.ip, traffic[i].IP, traffic[i].date.dateTime)
  }

  return(
    <section className="trafficLines flex column">
    {
      lines.map( (line, n)=>{

        const key = `TrafficLine${n}`

        const IP = line?.IP
        let addr = `
          ${IP?.country_code ? `[${IP.country_code}], ` : ``}
          ${IP?.country_name ? `${IP.country_name}, ` : ``}
          ${IP?.region ? `${IP.region}, ` : ``}
          ${IP?.postal_code ? `${IP.postal_code}, ` : ``}
          ${IP?.city ? `${IP.city}, ` : ``}
          ${IP?.asn_org ? `${IP.asn_org}` : ``}
        `

        let dateTime = `${line.date.year}.${line.date.month}.${line.date.day}`

        let colorCell = n === 0 ? `colorTop` : (line.count > 9 ? `colorCell` : ``)

        return(
          <div className={`trafficLine ${n === 0 ? `` : `LineCells`} flex`} key={key}>
            <span className={`cell cellCount flex ${colorCell}`}>{line.count}</span>
            <span className={`cell cellDateTime flex ${colorCell}`}>{dateTime}</span>
            <span className={`cell cellLogin flex start ${colorCell}`}>{line.login}</span>
            <span className={`cell cellAddr flex start ${colorCell}`}>{addr}</span>
          </div>
        )

      })
    }
    </section>
  )
}
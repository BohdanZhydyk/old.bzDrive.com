import React from 'react'


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
    date:{
      year:"YYYY",
      month:"MM",
      day:"DD"
    }
  }]

  let isUser = (login, IP, date)=>{
    let newIsUser = lines.filter( el=> el.login === login)
      newIsUser.length < 1
      ? lines.push( {login, count:1, IP, date} )
      : lines.map( el=> el.login === login ? el.count = (el.count + 1) : el )
  }

  for(let i=0; i<traffic.length; i++){
    traffic[i].user.login
    ? traffic[i]?.user?.login && isUser(traffic[i].user.login, traffic[i].IP, traffic[i].date.dateTime)
    : traffic[i]?.IP?.ip && isUser(traffic[i].IP.ip, traffic[i].IP, traffic[i].date.dateTime)
  }

  return(
    <section className="trafficLines flex column">
    {
      lines.map( (line, n)=>{

        let key = `TrafficLine${n}`

        let addr = `
          ${line.IP.country_name},
          ${line.IP.region},
          ${line.IP.postal_code},
          ${line.IP.city},
          ${line.IP.asn_org}
        `

        let dateTime = `
          ${line.date.day}.${line.date.month}.${line.date.year}
        `

        let colorCell = n === 0 ? `colorTop` : (line.count > 9 ? `colorCell` : ``)

        return(
          <div className="trafficLine flex" key={key}>
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
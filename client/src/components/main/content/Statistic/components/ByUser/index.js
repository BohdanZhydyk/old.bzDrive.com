import React from 'react'

import './ByUser.scss'


const ByUser = ({statistic})=>{

  let users = [{
    login:"login", n:"n",
    IP:{
      country_name:"country_name",
      region:"region",
      postal_code:"postal_code",
      city:"city",
      asn_org:"asn_org"
    }
  }]

  let isUser = (login, IP)=>{
    let isUser = users.filter( el=> el.login === login)
      isUser.length < 1
      ? users.push( {login, n:1, IP} )
      : users.map( el=> el.login === login ? el.n = (el.n + 1) : el )
  }

  for(let i=0; i<statistic.length; i++){
    statistic[i].user.login
    ? isUser(statistic[i].user.login, statistic[i].IP)
    : isUser(statistic[i].IP.ip, statistic[i].IP)
  }

  return(
    <div className="ByUser flex column">
    {
      users.map( (el,nr)=>{
        let flex = `lineCell flex ${nr !== 0 && `start`} ${nr === 0 && `top`}`
        return(
          <div className={`line flex`}>
            <div className={`n ${flex}`}>{el.n}</div>
            <div className={`login ${flex}`}>{el.login}</div>
            <div className={`country_name ${flex}`}>{el.IP.country_name}</div>
            <div className={`region ${flex}`}>{el.IP.region}</div>
            <div className={`postal_code ${flex}`}>{el.IP.postal_code}</div>
            <div className={`city ${flex}`}>{el.IP.city}</div>
            <div className={`asn_org ${flex}`}>{el.IP.asn_org}</div>
          </div>
        )
      })
    }
    </div>
  )
}

export default ByUser
import React, { useState, useEffect } from 'react'

import './Traffic.scss'
import { GET_STATE, SELECT_INT } from './actions'
import { IntBtns } from './IntBtns'
import { TrafficLines } from './TrafficLines'
import { ScreenSaver } from './../../../All/ScreenSaver'


const Traffic = ()=>{

  let qqq = {
    "_id": "6212a8b3edf6010a800316ae",
    "user": {
        "login": "bz83",
        "role": "admin",
        "email": "biuro@bzdrive.com",
        "lang": "pl",
        "sex": "male",
        "ava": true
    },
    "IP": {
        "host": "bzdrive.com",
        "from": "/getState",
        "ip": "217.171.50.209",
        "postal_code": "84-200",
        "country_code": "PL",
        "country_name": "Poland",
        "region": "Pomerania",
        "city": "Wejherowo",
        "asn_org": "Chopin Telewizja Kablowa spolka z ograniczona odpowiedzialnoscia"
    },
    "date": {
        "unix": 1645390003501,
        "dateTime": {
            "year": "2022",
            "month": "02",
            "day": "20",
            "hour": "21",
            "min": "46",
            "sec": "43"
        }
    },
    "bzToken": "uHKcKjyhb6ft3QpxAbpeFJRKCHiHGzADR6823CcXefj4xCDAyOrUcAHkIW1jE42N"
  }

  const [intervals, setIntervals] = useState([
    {name:"last day", to:86400000, act:true},
    {name:"last week", to:604800000},
    {name:"last month", to:2678400000},
    {name:"last year", to:31536000000}
  ])

  let int = 0
  intervals.map( (el)=> int = el.act ? el.to : int )

  const [traffic, setTraffic] = useState(false)

  // const trafficFn = (action)=> actions(action, intervals, setIntervals, traffic, setTraffic)

  const trafficFn = (action)=>{
    switch(action.type){
      case "GET_STATE":     GET_STATE(action, setTraffic);                               break
      case "SELECT_INT":    SELECT_INT(action, setTraffic, intervals, setIntervals);     break
      default: break
    }
  }

  useEffect( ()=>{ !traffic && trafficFn({ type:"GET_STATE", int }) },[])

  return(
    <div className="Traffic">

      <IntBtns props={{intervals, trafficFn}} />

      { traffic ? <TrafficLines props={{traffic}} /> : <ScreenSaver /> }

    </div>
  )
}

export default Traffic
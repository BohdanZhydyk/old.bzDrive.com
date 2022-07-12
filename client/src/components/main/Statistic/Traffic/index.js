import React, { useState, useEffect } from 'react'

import './Traffic.scss'
import { actions } from './actions'
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
    {name:"day", to:86400000, act:true},
    {name:"week", to:604800000},
    {name:"month", to:2678400000},
    {name:"year", to:31536000000}
  ])

  let int = 0
  intervals.map( (el)=> int = el.act ? el.to : int )

  const [traffic, setTraffic] = useState(false)

  const trafficFn = (action)=> actions(action, intervals, setIntervals, traffic, setTraffic)

  useEffect( ()=>{ !traffic && trafficFn({ type:"GET_STATE", int }) },[])

  return(
    <div className="Traffic">

      <IntBtns props={{intervals, trafficFn}} />

      { traffic ? <TrafficLines props={{traffic}} /> : <ScreenSaver /> }

    </div>
  )
}

export default Traffic
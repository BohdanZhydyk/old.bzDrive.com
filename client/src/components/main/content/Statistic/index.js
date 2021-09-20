import React, { useState, useEffect } from 'react'
import './Statistic.scss'

import { getUser } from './../../../../store/functions'

import { actions } from './actions'

import { Statistic } from './components/Statistic'
import Loader from './../Loader'


const StatisticApp = ()=>{

  const [statistic, setStatistic] = useState(false)

  const statisticFn = (action)=> actions(action, statistic, setStatistic)

  useEffect( ()=>{ !statistic && statisticFn({ type:"GET_STATE" }) },[])

  let user = getUser()

  // console.log('statistic', statistic)

  return(
    <div className="statistic">
      {
        !statistic
        ? <Loader />
        : <Statistic props={{statistic, user, statisticFn}} />
      }
    </div>
  )
}

export default StatisticApp
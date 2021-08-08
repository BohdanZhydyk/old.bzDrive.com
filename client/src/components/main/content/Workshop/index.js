import React, { useState, useEffect } from 'react'
import './Workshop.scss'

import { getUser } from './../../../../store/functions'

import { actions } from './actions'

import { Workshop } from './components/Workshop'
import Loader from './../Loader'


export const WorkshopApp = ()=>{

	const [workshop, setWorkshop] = useState(false)

  const workshopFn = (action)=> actions(action, workshop, setWorkshop)

  useEffect( ()=>{ !workshop && workshopFn({ type:"GET_STATE" }) },[])

  let user = getUser()

  console.log('workshop', workshop)

	return(
		<div className="workshop">
      {
        !workshop
        ? <Loader />
        : <Workshop props={{workshop, user, workshopFn}} />
      }
    </div>
	)
}

export default WorkshopApp
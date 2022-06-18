import React, { useState, useEffect } from 'react'
import './Workshop.scss'

import { bzGetUser } from './../../../state/functions'
import { actions } from './actions'
import { Workshop } from './components/Workshop'
import { ScreenSaver } from './../../All/ScreenSaver'


const WorkshopApp = ()=>{

	const [workshop, setWorkshop] = useState(false)

  const workshopFn = (action)=> actions(action, workshop, setWorkshop)

  useEffect( ()=>{ !workshop && workshopFn({ type:"GET_STATE" }) },[])

  let user = bzGetUser()

	return(
		<div className="workshop">
      {
        !workshop
        ? <ScreenSaver />
        : <Workshop props={{workshop, user, workshopFn}} />
      }
    </div>
	)
}

export default WorkshopApp
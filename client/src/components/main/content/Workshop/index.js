import React, { useState, useEffect } from 'react'
import './Workshop.scss'

import {
  GET_STATE
} from './actions'
import { Workshop } from './components/Workshop'
import Loader from './../Loader'


function WorkshopApp({ props:{content, user, fn} }){

	const [workshop, setWorkshop] = useState(content)

	let workshopFn = (action)=>{
    switch(action.type){
      case "GET_STATE": GET_STATE(fn);	break;
      default: break
    }
  }

  useEffect( ()=>{ !content && workshopFn({ type:"GET_STATE" }) },[])

  // console.log('workshop', workshop)

	return(
		<div className="workshop">
      {
        !content
        ? <Loader />
        : <Workshop props={{workshop, user, workshopFn}} />
      }
    </div>
	)
}

export default WorkshopApp
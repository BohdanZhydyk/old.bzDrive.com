import React, { useState, useEffect } from 'react'
import './index.scss'

import { actions } from './actions'

import { Header } from './components/Header/Header'
import { Main } from './components/Main/Main'
import { Footer } from './components/Footer/Footer'
import Loader from './../Loader'


const CvApp = ()=>{

  const [cv, setCv] = useState(false)

  const cvFn = (action)=> actions(action, cv, setCv)

  useEffect( ()=>{ !cv && cvFn({ type:"GET_STATE" }) },[])

  console.log('cv', cv)

  return (
    <div className="CV">
      {
        cv
        ?
        <>
          <Header data={cv.header} />
          <Main data={cv.main} />
          <Footer data={cv.footer} />
        </>
        :
        <Loader />
      }
    </div>
  )
}

export default CvApp
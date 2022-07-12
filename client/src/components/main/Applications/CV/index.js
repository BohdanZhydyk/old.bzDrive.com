import React, { useState, useEffect, useRef } from "react"
import { useReactToPrint } from 'react-to-print';
import './index.scss'

import { Header } from './components/Header'
import { Main } from './components/Main'
import { Footer } from './components/Footer'
import { ScreenSaver } from "./../../../All/ScreenSaver"
import { bzPost } from './../../../../state/functions'


const CvApp = ()=>{

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [cv, setCv] = useState(false)

  useEffect( ()=>{ !cv && bzPost("/getCV", {}, (data)=> setCv(data.cv) ) },[])

  return (
    <div className="CV flex column" ref={componentRef}>
      {
        !cv
        ?
        <ScreenSaver />
        :
        <>
          <Header props={{data:cv.header, handlePrint}} />
          <Main data={cv.main} />
          <Footer data={cv.footer} />
        </>
        
      }
    </div>
  )
}

export default CvApp
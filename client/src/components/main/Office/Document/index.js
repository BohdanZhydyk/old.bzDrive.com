import React, { useState, useEffect, useRef } from "react"
import { useReactToPrint } from 'react-to-print';
import cookies from 'js-cookie'

import "./Document.scss"
import { ScreenSaver } from "./../../../All/ScreenSaver"
import EditArea from "./../EditArea"


const Document = ()=>{

  const [mode, setMode] = useState(false)
  const [doc, setDoc] = useState(false)

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  useEffect( ()=>{
    let coo = cookies.get('Document') ? JSON.parse( cookies.get('Document') ) : false
    !doc && setMode(coo.mode); setDoc(coo.el); cookies.remove('Document')
  },[])

  let PRINTFUNC = {
    print:true,
    DO: ()=> handlePrint()
  }

  // console.log("doc", doc)

  return(
    <div className="Document" ref={componentRef}>
    {
      !doc
      ? <ScreenSaver />
      : <EditArea props={{mode, line:doc, PRINTFUNC}}/>
    }
    </div>
  )
}

export default Document
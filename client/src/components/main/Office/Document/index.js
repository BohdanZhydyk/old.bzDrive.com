import React, { useState, useEffect, useRef } from "react"
import { useReactToPrint } from 'react-to-print';
import cookies from 'js-cookie'

import "./Document.scss"
import { DigLen, bzPost } from "../../../../state/functions";
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
    let GET_DOC = ()=>{
      let coo = cookies.get('Document') ? JSON.parse( cookies.get('Document') ) : false
      bzPost( "/getOffice", { getDoc:coo.mode, id:coo.id }, (data)=>{
        setMode(coo.mode)
        setDoc(data)
        handlePrint()
      })
    }
    !doc && GET_DOC()
  },[])

  useEffect(()=>{
    if(doc?.nr){
      let letter = doc.nr.letter
      let YYYY = DigLen(doc.nr.year, 4)
      let MM = DigLen(doc.nr.month, 2)
      let DD = DigLen(doc.nr.sign, 4)
      document.title = `${letter}/${YYYY}/${MM}/${DD}`
    }
  })

  let PRINTFUNC = {
    print:true,
    DO: ()=> handlePrint()
  }

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
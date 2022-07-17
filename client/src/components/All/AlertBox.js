import React, { useState } from "react"


export const AlertBox = ({ props:{err, CLOSE} })=>{

  const [msg, setMsg] = useState( err )

  let attImg = "https://files.bzdrive.com/img/ico/icoAtt.png"
  let cancelImg = "https://files.bzdrive.com/img/ico/icoCancel.png"

  // FOR OUTSIDE COMPONENTS
  // import { AlertBox } from "../../../All/AlertBox"
  // const [err, setErr] = useState( false )
  // let CLOSE = ()=> setErr( false )
  // { err && <AlertBox props={{err, CLOSE}}/> }

  // console.log("AlertBoxMsg",msg)

  return(
    <div className="AlertBox flex column">
    {
      err &&
      <div className="Message boxShadow flex">

        <img className="imgBtnBig flex" src={attImg} alt="att" />

        <textarea >{err}</textarea>

        <img
          className="imgBtn flex"
          src={cancelImg}
          onClick={ ()=> CLOSE() }
          title={`zamknąć`}
          alt="close"
        />

      </div>
    }
    </div>
  )
}
import React, { useState } from 'react'

import { unixToDateTimeConverter } from '../../../state/functions'


export const ToPast = ({ props:{mode, table, setTable, officeFn} })=>{

  const [MM_YYYY, setMM_YYYY] = useState({
    MM: parseInt( unixToDateTimeConverter().month ),
    YYYY: parseInt( unixToDateTimeConverter().year )
  })

  let months = ["00","01","02","03","04","05","06","07","08","09","10","11","12"]
  let docs = { "FS": "Faktury", "ZL": "Zlecenia" }

  let MM = MM_YYYY.MM - 1
  let YYYY = MM_YYYY.YYYY
  if(MM === 0){ MM = 12; YYYY = YYYY - 1 }
  
  let MONTH_CHG = ()=>{

    let query = {}
    let payload = {"nr.month":`${months[MM]}`, "nr.year":`${YYYY}`}
  
    switch(mode){
      case "FS":  query = { ...payload };                 break
      case "ZL":  query = { status:"done", ...payload };  break
      default:    query = {};                             break
    }

    setMM_YYYY({ MM, YYYY })

    officeFn(table, setTable, {type:"GET_TO_PAST", mode, query})

  }

  return(
    <div className="ToPast flex column">

      {
        table.length === 0 &&
        <span className="empty flex txtOrg">
          {`pusta tabela`}
        </span>
      }

      <div className="ToPastBtn bold flex" onClick={ ()=> MONTH_CHG() }>
        {`${docs[mode]} za ${months[MM]}.${YYYY}`}
      </div>

    </div>
  )
}
import React from 'react'


export const ToPast = ({ props:{mode, table, MM_YYYY, setMM_YYYY, officeFn} })=>{

  let months = ["00","01","02","03","04","05","06","07","08","09","10","11","12"]
  let docs = { "FS": "Faktury", "ZL": "Zlecenia" }

  let MM = MM_YYYY.MM - 1
  let YYYY = MM_YYYY.YYYY
  if(MM === 0){ MM = 12; YYYY = YYYY - 1 }

  let MONTH_CHG = ()=>{
    setMM_YYYY({ MM, YYYY })
    officeFn({
      type:"GET_TO_PAST",
      payload:{"nr.month":`${months[MM]}`, "nr.year":`${YYYY}`}
    })
  }

  return(
    <div className="ToPast flex column">

      {
        table.length === 0 &&
        <span className="empty flex txtOrg">
          {`pusta tabela`}
        </span>
      }

      {
        docs[mode] &&
        <div className="ToPastBtn bold flex" onClick={ ()=> MONTH_CHG() }>
          {`${docs[mode]} za ${months[MM]}.${YYYY}`}
        </div>
      }


    </div>
  )
}
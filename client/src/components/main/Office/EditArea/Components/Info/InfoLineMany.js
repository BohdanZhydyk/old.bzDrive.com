import React from "react";


export const InfoLineMany = ({ props:{input, legendMany} })=>{
  return(
    <div className="infoLine">

      <span className="infoLineLegend flex start">
        {`${legendMany}:`}
      </span>

      <span className={`infoLineValue flex start bold ${input[0].style}`} >
        {
          input.map( (el, i)=>{
            return(
              el?.val ? <span key={`infoLineValue${el.form}${i}`}>{el.val}</span> : <></>
            )
          })
        }
      </span>

    </div>
  )
}
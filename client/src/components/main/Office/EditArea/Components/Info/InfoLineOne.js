import React from "react";


export const InfoLineOne = ({ props:{input} })=>{
  return(
    <>
    {
      input.map( (el, i)=>{
        return(
          <div className="infoLine" key={`InfoLine${input.legend}${i}`}>

            <span className="infoLineLegend flex start">
              {`${el.legend}:`}
            </span>

            <span className={`infoLineValue flex start bold ${el.style}`}>
              {el.val}
            </span>

          </div>
        )        
      })
    }
    </>
  )
}
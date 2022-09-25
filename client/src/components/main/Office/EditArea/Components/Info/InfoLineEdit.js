import React from "react";

import { Input } from "../../../../../All/Input";


export const InfoLineEdit = ({ props:{input, print, AreaFn} })=>{
  return(
    <div className="infoLine flex">

      {
        input.map( (el, i)=>{
          return <Input props={{input:el, print, Fn:AreaFn}} key={`InfoLine${input.legend}${i}`} />
        })
      }

    </div>
  )
}
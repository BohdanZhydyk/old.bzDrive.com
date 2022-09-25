import React from "react";

import { InfoLineMany } from "./InfoLineMany"
import { InfoLineOne } from "./InfoLineOne"


export const InfoLine = ({ props:{input} })=>{
  
  let legendMany = ``
  for(let i=0; i<input.length; i++){
    if(i !== input.length - 1){ legendMany = legendMany + input[i].legend + ` / ` }
    else{ legendMany = legendMany + input[i].legend }
  }
  
  return(
    <>
    {
      input.length > 1
      ? <InfoLineMany props={{input, legendMany}} />
      : <InfoLineOne props={{input}} />
    }
    </>
  )
}
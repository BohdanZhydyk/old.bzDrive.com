import React from "react"


export const EmptyList = ()=>{

  let txt = `Brak dokumentów dla tego wyszukiwania !`

  return(
    <span className="EmptyList txtOrg bold flex">
      {txt}
    </span>
  )
}
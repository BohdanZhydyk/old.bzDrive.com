import React from "react"


export const EmptyList = ({ props:{invoices} })=>{

  let txt = `Nie znaleziono dokumentów w podanym zakresie !`

  return(
    <>
    {
      invoices.length === 0 &&
      <span className="EmptyList txtOrg bold flex">
        {txt}
      </span>
    }
    </>
  )
}
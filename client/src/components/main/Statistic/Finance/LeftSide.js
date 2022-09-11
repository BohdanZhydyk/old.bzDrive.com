import React from 'react'


export const LeftSide = ({ props:{i, finDate, In, Out, ZUS, VAT, Sum} })=>{

  let lines = [
    {
      style:`FinLine lineGrn bold flex between`,
      title:`Przychód (netto):`,
      val:`${In} zł`
    },
    {
      style:`FinLine lineRed bold flex between`,
      title:`Wydatki (netto):`,
      val:`${Out} zł`
    },
    {
      style:`FinLine lineYlw bold flex between`,
      title:`ZUS:`,
      val:`${ZUS} zł`
    },
    {
      style:`FinLine lineBlu bold flex between`,
      title:`${VAT > 0 ? `Do zaplaty VAT` : `Nadwyższka VAT`}:`,
      val:`${VAT} zł`
    },
    {
      style:`FinLine lineSum ${Sum > 0 ? `lineGrn` : `lineRed`} bold flex between`,
      title:`${Sum > 0 ? `Zaróbek` : `Strata`} (netto):`,
      val:`${Sum} zł`
    }
  ]

  return(
    <div className="LeftSide flex column">
      
      <div className="FinTop flex column">
        <div className="TextLine bold flex start">{finDate}</div>
      </div>

      <div className="line"></div>

      {
        lines.map( (el, n)=>{
          return(
            <div className={el.style} key={`FinLine${i}${n}`}>
              <span>{el.title}</span>
              <span>{el.val}</span>
            </div>
          )
        })
      }

      <div className="line"></div>

    </div>
  )
}
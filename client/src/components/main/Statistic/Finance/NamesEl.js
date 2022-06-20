import React from 'react'
import { bzCalc } from './../../../../state/functions'


export const NamesEl = ({ props:{el} })=>{

  let inEl = bzCalc( "+", el.in.netto, el.in.vat )
  let outEl = bzCalc("+", bzCalc( "+", el.out.netto, el.out.vat ), el.salary)
  let sumEl = bzCalc("-", inEl, outEl)
  let plus = sumEl > 0

  return(
    <>
      <div className="line flex between">
        <span className="txtYlw">{el.name}</span>
        <span>{inEl}</span>
      </div>
      <div className="line flex end">{outEl}</div>
      <div className={`line ${plus ? `sumGrn` : `sumRed`} bold flex end`}>
        <span>{`${plus ? `zaróbek` : `strata`}: ${sumEl}`}</span>
      </div>
    </>
  )
}
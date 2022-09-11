import React from 'react'

import { bzCalc } from '../../../../state/functions'


export const RightSide = ({ props:{i, In, Out, ZUS, VAT, Sum} })=>{

  let maxSum = 10000

  let widthFn = (a)=>{ return {width:`${bzCalc("/", bzCalc("*", a, 100), maxSum)}%`} }

  return(
    <div className="RightSide flex column">

      <div className="FinTop flex column">
        <div className="TextLine flex between">
        {
          [1,2,3,4].map( (mark, n)=>{
            return(
              <span className={`mark mark${n === 0 ? `L` : `R`} flex end`} key={`Mark${i}${n}`}>
                {maxSum / 4 * mark}
              </span>
            )
          })
        }
        </div>
      </div>

      <div className="line"></div>

      <div className="FinLine flex start">
        <span className="ProgBar lineGrn" style={ widthFn(In) }></span>
      </div>

      <div className="FinLine flex start">
        <span className="ProgBar lineRed" style={ widthFn(Out) }></span>
      </div>

      <div className="FinLine flex start">
        <span className="ProgBar lineYlw" style={ widthFn(ZUS) }></span>
      </div>

      <div className="FinLine flex start">
        <span className="ProgBar lineBlu" style={ widthFn(Math.abs(VAT)) }></span>
      </div>

      <div className="FinLine flex between">
        <span className={`ProgBar ${Sum > 0 ? `lineGrn` : `lineRed`}`} style={ widthFn(Math.abs(Sum)) }></span>
      </div>
      
      <div className="line"></div>

    </div>
  )
}
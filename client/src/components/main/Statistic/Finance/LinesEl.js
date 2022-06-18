import { bzCalc } from './../../../../state/functions'


export const LinesEl = ({ props:{el} })=>{

  let widthFn = (a)=>{ return {width:`${bzCalc("/", bzCalc("*", a, 100), 20000)}%`} }

  let inEl = bzCalc( "+", el.in.netto, el.in.vat )
  let outEl = bzCalc("+", bzCalc( "+", el.out.netto, el.out.vat ), el.salary)
  let tax = bzCalc("-", el.in.vat, el.out.vat)
  let sumEl = bzCalc("-", inEl, outEl)
  let plus = sumEl > 0

  return(
    <>
      <div className="line flex start">
        <span className="lineGrn" style={ widthFn(inEl) }></span>
      </div>
      <div className="line flex start">
        <span className="lineRed" style={ widthFn(outEl) }></span>
      </div>
      <div className={`line ${!plus ? `taxGrn` : `taxRed`} bold flex start`}>
        <span>{`podatek VAT: ${tax}`}</span>
      </div>
    </>
  )
}
import React from "react"


import ActionBtn from "../../../All/ActionBtn"
import { EditSection } from "./EditSection"


export const FiLines = ({ props:{month, m, FiLogic} })=>{

  let CLICK = (btn, b)=>{ FiLogic({ type:"BTN_CLICK", btn, month:m, nr:b }) }

  return(
    <>
    {
      month.map( (el, i)=>{

        let key = `FiLine${el?.mode}${i}`
        let classes = `${el?.mode ? `Mode${el.mode}` : ``}`

        return(
          <div className={`FiLine ${classes} flex wrap`} key={key}>

            <div className={`nr start`}>{el?.nr ? el.nr : i}</div>
            <div className={`doc flex start`}>{el?.doc ? el.doc : `-----`}</div>
            <div className={`El info flex start`}>{el?.info ? el.info : `-----`}</div>
            <div className={`sum flex start`}>{el?.sum ? `${el.sum} zł` : `0.00 zł`}</div>

            <div className={`btns flex end`}>
            {
              el?.btns &&
              el.btns.map( (btn, b)=>{
                let key = `FinLineBtn${i}${b}`
                return <ActionBtn props={{ name:btn, click:()=>CLICK(btn, b) }} key={key} />
              })
            }
            </div>

            { el?.edit && <EditSection props={{}} /> }

          </div>
        )
      })
    }
    </>
  )
}
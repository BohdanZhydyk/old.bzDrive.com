import React, { useEffect } from "react"

import { SumArray, NormalizeNr } from "../../../../state/functions"
import ActionBtn from "../../../All/ActionBtn"
import EditArea from "./../EditArea"


export const FiLines = ({ props:{month, m, dates, FiLogic, ReloadFn} })=>{

  let CLICK = (btn, b)=>{ FiLogic({ type:"BTN_CLICK", btn, month:m, nr:b }) }

  useEffect( ()=>{ !month?.base && FiLogic({ type:"GET_FINANCES", dates, nr:m }) },[])

  // console.log("base"+m, month?.base)

  return(
    <>

    {
      month?.base &&
      <div className={`FiLine ModeTop flex wrap`} key={`FiLineTop`}>
        <div className={`nr start`}>{`Nr`}</div>
        <div className={`doc flex start`}>{`Dokument`}</div>
        <div className={`El info flex start`}>{`Informacja`}</div>
        <div className={`net flex start`}>{`Netto`}</div>
        <div className={`sum flex start`}>{`Brutto`}</div>
        <div className={`btns flex end`}></div>
      </div>
    }
      
    {
      month?.base &&
      month.base.map( (el, i)=>{

        let key = `FiLine${el?.nr?.mode}${i}`
        let classes = `${el?.nr?.mode ? `Mode${el.nr.mode}` : ``}`
        let net = el?.articles ? `${SumArray(el.articles.map(el=>el.NET))} zł` : `0.00 zł`
        let sum = el?.articles ? `${SumArray(el.articles.map(el=>el.SUM))} zł` : `0.00 zł`

        let props = {
          mode:el.nr.mode,
          line: el,
          CANCEL: ()=>CLICK("Edit", i),
          ReloadFn
        }

        return(
          <div className={`FiLine ${classes} flex wrap`} key={key}>

            <div className={`nr start`}>{i + 1}</div>
            <div className={`doc flex start`}>{el?.nr ? NormalizeNr(el.nr) : `-----`}</div>
            <div className={`El info flex start`}>{el?.buyer?.name ? el.buyer.name : `-----`}</div>
            <div className={`net flex start`}>{net}</div>
            <div className={`sum flex start`}>{sum}</div>

            <div className={`btns flex end`}>
            {
              el?.btns
              ? el.btns.map( (btn, b)=>{
                let key = `FinLineBtn${i}${b}`
                return <ActionBtn props={{ name:btn, click:()=>CLICK(btn, b) }} key={key} />
              })
              : <ActionBtn props={{ name:"Edit", click:()=>CLICK("Edit", i) }} key={key} />
            }
            </div>

            { el?.edit && <EditArea props={props} /> }

          </div>
        )
      })
    }
    </>
  )
}
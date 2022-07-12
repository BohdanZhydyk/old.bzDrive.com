import React from 'react'
import { NormalizeNr } from "../../../../../state/functions"
import { Cell } from "./../../Cell"
import EditArea from "../../EditArea"


export const ZL = ({ props:{mode, table, officeFn} })=>{

  const toInt = (el)=> parseInt(el.dateTo.year + el.dateTo.month + el.dateTo.day)

  let ActiveOrders = table.sort( (a,b)=> toInt(a) - toInt(b) ).filter( el=> el.status !== "done" )
  let DoneOrders = table.sort( (a,b)=> toInt(b) - toInt(a) ).filter( el=> el.status === "done" )

  const names = [
    "Zlecenie Nr.",
    "Telefon",
    "Marka / Model / Numer rejestracyjny",
    "Opis i zakres uszkodzenia",
    "Cena brutto"
  ]

  let cell = (line, n)=>{

    const LineNr = line?.nr
    const lineName = line?.buyer?.name
    const lineTel = line?.buyer?.contacts?.tel ? line?.buyer?.contacts?.tel : line?.buyer?.name
    const lineBrand = line?.car?.brand ? line?.car?.brand : ""
    const lineModel = line?.car?.model ? ` / ${line?.car?.model}` : ""
    const lineNumbers = line?.car?.numbers ? ` / ${line?.car?.numbers}` : ""

    let nr = n === 0 ? names[0] : NormalizeNr(mode, LineNr)
    let name = <a href={`tel: ${lineName}`}>{lineName}</a>
    let tel = n === 0 ? names[1] : <a href={`tel: ${lineTel}`}>{lineTel}</a>
    let car = n === 0 ? names[2] : lineBrand + lineModel + lineNumbers
    let faults = n === 0 ? names[3] : line?.car?.faults
    let brutto = n === 0 ? names[4] : line?.brutto

    let date = new Date(
      `${line?.date?.year}.${line?.date?.month}.${line?.date?.day}`
    ).getTime() / 1000
    let dateTo = new Date(
      `${line?.dateTo?.year}.${line?.dateTo?.month}.${line?.dateTo?.day}`
    ).getTime() / 1000

    let now = Math.floor(Date.now() / 1000)
    let to = now - date
    let from = dateTo - now + 28800
    let proc = (to + from) / 100
    let widthL = to / proc
    let widthR = from / proc

    let color = ()=>{
      if(widthL < 30) return `#1a1`
      if(widthL >= 30 && widthL < 60) return `#fd0`
      if(widthL >= 60) return `#f00`
      return `#0000`
    }

    return {
      nr:     {txt:nr,        cl:"small",                           align:"",       line, n},
      tel:    {txt:tel,       cl:"small",                           align:"",       line, n},
      name:   {txt:name,      cl:"small",                           align:"",       line, n},
      car:    {txt:car,       cl:`big ${n !== 0 ? `txtYlw` : ``}`,  align:"start",  line, n},
      faults: {txt:faults,    cl:"big",                             align:"start",  line, n},
      brutto: {txt:brutto,    cl:"small",                           align:"end",    line, n},
      widthL: {txt:widthL,    cl:"",                                align:"",       line, n},
      widthR: {txt:widthR,    cl:"",                                align:"",       line, n},
      color:  {txt:color(),   cl:"",                                align:"",       line, n}
    }
  }

  return(
    <>
    {
      [ {}, ...ActiveOrders, ...DoneOrders ].map( (line, n)=>{

        let done = n !== 0 && line.status !== "done"

        let styles = {
          leftStyle: {width:`${cell(line, n).widthL.txt}%`, backgroundColor:cell(line, n).color.txt},
          rightStyle: {width:`${cell(line, n).widthR.txt}%`}
        }

        return(
          <div className="line flex stretch wrap" key={n+line._id}>

            {
              done &&
              <>
                <div className="lineDateTo flex start">
                  <div className={`lineDateleft`} style={styles.leftStyle}></div>
                  <div className={`lineDateright`} style={styles.rightStyle}></div>
                </div>
                <div className="lineDateToEmpty imgBtn flex start"></div>
              </>
            }

            <div>
              <Cell props={ cell(line, n).nr }/>
              <Cell props={ cell(line, n).tel }/>
            </div>

            <div>
              <Cell props={ cell(line, n).car }/>
              <Cell props={ cell(line, n).faults }/>
            </div>

            <Cell props={ cell(line, n).brutto }/>

            <EditArea props={{mode, line, n, officeFn}}/>
            
          </div>
        )
      })
    }
    </>
  )
}
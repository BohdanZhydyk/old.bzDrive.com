import React, { useState, useEffect } from "react"

import { NormalizeNr, bzCalc } from "../../../../state/functions"
import { SalaryOrder } from "./SalaryOrder"
import { SaveCheckedBtn } from "./SaveCheckedBtn"


export const Salary = ({ props:{mode, role, ReloadFn, officeFn} })=>{

  const [salary, setSalary] = useState( false )

  let CHECK_ORDER = (id)=> setSalary(
    salary.map( order=> (order._id === id) ? {...order, chk:!order.chk} : order )
  )

  useEffect( ()=>{ !salary && officeFn( {type:"GET_TABLE", mode, query:{"status":"edited"}}, (data)=>{
    setSalary(
      data.sort( (a, b)=>{ // sort by unix
        let A = parseInt(a.date.unix)
        let B = parseInt(b.date.unix)
        return (A - B)
      })
    )
  }) })

  const SummaryAll = (art)=>{
    let brutto = "0.00"
    for(let i=0; i<art?.length; i++) brutto = bzCalc( "+", brutto, art[i].brutto )
    return brutto
  }

  let sumObj = {
    obj:{
      tel:`Suma razem`, brutto:SummaryAll(salary),
      style:{
        justifyContent:"flex-end",
        color:"#f60",
        fontWeight:"bold",
        fontSize:"120%"
      }
    }
  }

  let chkObj = {
    obj:{
      tel:`Suma zaznaczonych`, brutto:SummaryAll(salary && salary.filter( el=> el.chk )),
      style:{
        justifyContent:"flex-end",
        color:"#fd0",
        fontWeight:"bold",
        fontSize:"120%"
      }
    }
  }

  // console.log("salary", salary)

  return(
    <div className="Salary flex column">

      <div className="title flex bold">{`Otwarte zlecenia`}</div>
      
      {
        salary && salary.map( (order, i)=>{

          let nr = NormalizeNr(mode, order.nr)

          let car = `${order.car.brand} - ${order.car.model}`

          let tel = order?.buyer?.contacts?.tel
            ? order.buyer.contacts.tel
            : order?.buyer?.name ? order.buyer.name : "empty"

          let brutto = order.brutto

          let style = {
            backgroundColor: order.car.color,
            backgroundImage:`linear-gradient(0deg, ${order.car.color}, #2229 30% 70%, ${order.car.color})`
          }
          
          let props = {mode, order, obj:{nr, car, tel, brutto, style}, CHECK_ORDER, ReloadFn, officeFn}

          let key = `SalaryOrder${i}`

          return <SalaryOrder props={props} key={key} />

        })
      }

      <SalaryOrder props={sumObj} key={`SalaryOrderSum`} />

      <SalaryOrder props={chkObj} key={`SalaryOrderChecked`} />

      <SaveCheckedBtn props={{mode, role, salary, setSalary, ReloadFn, officeFn}} />

    </div>
  )
}
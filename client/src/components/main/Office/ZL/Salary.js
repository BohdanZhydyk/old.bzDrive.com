import React, { useState, useEffect } from "react"

import { NormalizeNr, bzGetUser } from "../../../../state/functions"
import { Logic, SumObj } from "./SalaryLogic"
import { translate } from "../../../../state/translate"
import { EmptyList } from "./EmptyList"
import SearchPannel from "../SearchPannel"
import { SalaryOrder } from "./SalaryOrder"
import { SaveCheckedBtn } from "./SaveCheckedBtn"


export const Salary = ({ props:{mode, lang, role, calendar, ReloadFn, officeFn} })=>{

  const [searchSt, setSearchSt] = useState( false )
  const [salary, setSalary] = useState( false )

  let CHECK_ORDER = (id)=> setSalary(
    salary.map( order=> (order._id === id) ? {...order, chk:!order.chk} : order )
  )

  let rule = (el)=>{
    return(
      bzGetUser().role === "admin" ||
      el?.buyer?.name === "AG" ||
      el?.user === bzGetUser().login
    )
  }

  let SalaryFn = (action)=> Logic(action, mode, officeFn, setSearchSt, setSalary)

  useEffect( ()=>{ !salary && !searchSt && SalaryFn({type:"GET_TABLE"}) })

  let isChk = salary && salary.filter( el=> el.chk )
  
  // console.log("salary", salary)

  return(
    <div className="Salary flex column">

      <div className="title flex bold">{`${!searchSt ? `Otwarte ` : ``}${translate(lang, mode)}`}</div>

      <SearchPannel props={{mode, calendar, Fn:SalaryFn}} />
      
      {
        salary && salary.map( (order, i)=>{

          let status = order.status
          let nr = NormalizeNr(order.nr)
          let car = `${order.car.brand} - ${order.car.model}`
          let name = `${order?.buyer?.name ? order.buyer.name : ``}`
          let tel = `${order?.buyer?.contacts?.tel ? order.buyer.contacts.tel : ``}`
          let sum = (rule(order) && order?.articles) ? SumObj(false, false, false, order) : `0.00`

          let style = {
            backgroundColor: order.car.color,
            backgroundImage:`linear-gradient(0deg, ${order.car.color}, #2229 30% 70%, ${order.car.color})`
          }
          
          let props = {
            mode, order, obj:{status, nr, car, name, sum, tel, style}, rule, CHECK_ORDER, ReloadFn
          }

          let key = `SalaryOrder${i}`

          return <SalaryOrder props={props} key={key} />

        })
      }

      { salary.length === 0 && <EmptyList /> }

      {
        salary.length > 0 &&
        <SalaryOrder props={ SumObj("Suma razem", "#f60", salary.filter(el=>rule(el))) } key={`SalaryOrderSum`} />
      }

      {
        (isChk.length > 0) &&
        <SalaryOrder props={ SumObj("Suma zaznaczonych", "#fd0", salary.filter(el=>rule(el) && el.chk)) } key={`SalaryOrderChecked`} />
      }
      
      {
        (isChk.length > 0) &&
        <SaveCheckedBtn props={{mode, searchSt, role, salary, setSalary, ReloadFn, officeFn}} />
      }

    </div>
  )
}
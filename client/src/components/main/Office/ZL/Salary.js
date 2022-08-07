import React, { useState, useEffect } from "react"

import { NormalizeNr, SumArray, DateToUnix } from "../../../../state/functions"
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

  let GET_TABLE = (query, cb)=> officeFn( {type:"GET_TABLE", mode, query}, (data)=> cb(data) )

  useEffect( ()=>{ !salary && !searchSt && GET_TABLE(
    {"status":"edited"},
    (data)=> setSalary(
        data.sort( (a, b)=>{ // sort by unix
          let A = parseInt(a.date.unix)
          let B = parseInt(b.date.unix)
          return (A - B)
        })
      )
    )
  })

  let SumBrutto = SumArray(salary && salary.map( (el)=> el.brutto ))
  let ChkBrutto = SumArray(salary && salary.filter( el=> el.chk ).map( (el)=> el.brutto ))

  let sumObj = {
    obj:{
      name:`Suma razem`, brutto:SumBrutto,
      style:{color:"#f60", fontWeight:"bold", fontSize:"120%"}
    }
  }

  let chkObj = {
    obj:{
      name:`Suma zaznaczonych`, brutto:ChkBrutto,
      style:{color:"#fd0", fontWeight:"bold", fontSize:"120%"}
    }
  }

  let SalaryFn = (action)=>{

    let from = action.from
    let to = action.to
    let car = action.car.length > 0 ? action.car : false
    let tel = action.tel.length > 0 ? action.tel : false

    let query1 = (car)
      ? {
          $or:[
            {
              $or:[
                {"car.brand":{ $regex:car.toUpperCase() }},
                {"car.brand":{ $regex:car.toLowerCase() }},
                {"car.brand":{
                  $regex:(car.toLowerCase().charAt(0).toUpperCase() + car.toLowerCase().slice(1))
                }}
              ]
            },
            {
              $or:[
                {"car.model":{ $regex:car.toUpperCase() }},
                {"car.model":{ $regex:car.toLowerCase() }},
                {"car.model":{
                  $regex:(car.toLowerCase().charAt(0).toUpperCase() + car.toLowerCase().slice(1))
                }}
              ]
            }
          ]
        }
      : {}

    let query2 = (tel)
      ? {
          $or:[
            {
              $or:[
                {"buyer.name":{ $regex:tel.toUpperCase() }},
                {"buyer.name":{ $regex:tel.toLowerCase() }},
                {"buyer.name":{
                  $regex:(tel.toLowerCase().charAt(0).toUpperCase() + tel.toLowerCase().slice(1))
                }}
              ]
            },
            {"buyer.contacts.tel":{$regex:tel}}
          ]
        }
      : {}

    let query3 = (from && to) ? { "date.unix":{$gte:DateToUnix(from), $lte:DateToUnix(to)} } : {}
    let query4 = (from && to) ? { "dateTo.unix":{$gte:DateToUnix(from), $lte:DateToUnix(to)} } : {}

    switch(action.type){
      case "SEARCH":
        setSearchSt( true )
        setSalary(false)
        GET_TABLE(
          { $and: [query1, query2, query3, query4] },
          (data)=> setSalary(
            data.sort( (a, b)=>{ // sort by unix
              let A = parseInt(a.date.unix)
              let B = parseInt(b.date.unix)
              return (A - B)
            })
          )
        )
        return
      default: return
    }
  }

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

          let brutto = order.brutto

          let style = {
            backgroundColor: order.car.color,
            backgroundImage:`linear-gradient(0deg, ${order.car.color}, #2229 30% 70%, ${order.car.color})`
          }
          
          let props = {
            mode, order, obj:{status, nr, car, name, tel, brutto, style}, CHECK_ORDER, ReloadFn, officeFn
          }

          let key = `SalaryOrder${i}`

          return <SalaryOrder props={props} key={key} />

        })
      }

      { salary.length === 0 && <EmptyList /> }

      { salary.length > 0 && <SalaryOrder props={sumObj} key={`SalaryOrderSum`} /> }

      { (isChk.length > 0) && <SalaryOrder props={chkObj} key={`SalaryOrderChecked`} /> }
      
      {
        (isChk.length > 0) &&
        <SaveCheckedBtn props={{mode, searchSt, role, salary, setSalary, ReloadFn, officeFn}} />
      }

    </div>
  )
}

import { SumArray, bzCalcVatSum } from "../../../../state/functions"


export const Logic = (action, mode, officeFn, setSearchSt, setSalary)=>{

  let GET_TABLE = (query, cb)=> officeFn( {type:"GET_TABLE", mode, query}, (data)=> cb(data) )

  let SortByDate = (data)=> data.sort( (a, b)=> (parseInt(a.nr.from) - parseInt(b.nr.from)) )
  
  const query1 = (car)=>{
    return(
      !car
      ? {}
      : { $or:[
          { $or:[
            {"car.brand":{ $regex:car.toUpperCase() }}, {"car.brand":{ $regex:car.toLowerCase() }},
            {"car.brand":{
              $regex:(car.toLowerCase().charAt(0).toUpperCase() + car.toLowerCase().slice(1))
            }}
          ]},
          { $or:[
            {"car.model":{ $regex:car.toUpperCase() }}, {"car.model":{ $regex:car.toLowerCase() }},
            {"car.model":{
              $regex:(car.toLowerCase().charAt(0).toUpperCase() + car.toLowerCase().slice(1))
            }}
          ]}
        ]}
    )
  }

  const query2 = (tel)=>{
    return(
      !tel
      ? {}
      : { $or:[
          { $or:[
            {"buyer.name":{ $regex:tel.toUpperCase() }}, {"buyer.name":{ $regex:tel.toLowerCase() }},
            {"buyer.name":{
              $regex:(tel.toLowerCase().charAt(0).toUpperCase() + tel.toLowerCase().slice(1))
            }}
          ]},
          {"buyer.contacts.tel":{$regex:tel}}
        ]}
    )
  }

  const query3 = (from, to) => (from && to) ? { "nr.from":{$gte:from, $lte:to} } : {}
  const query4 = (from, to) => (from && to) ? { "nr.to":{$gte:from, $lte:to} } : {}

  switch(action.type){
    case "GET_TABLE":
      GET_TABLE( {"status":"edited"}, (data)=> setSalary(SortByDate(data)) )
      return
    case "SEARCH":
      setSearchSt( true )
      setSalary( false )
      let car = action.car.length > 0 ? action.car : false
      let tel = action.tel.length > 0 ? action.tel : false
      let from = action.from
      let to = action.to
      let queryes = [query1(car), query2(tel), query3(from, to), query4(from, to)]
      GET_TABLE( { $and:queryes }, (data)=> setSalary(SortByDate(data)) )
      return
    default: return
  }
}

export const SumObj = (name, color, salary, order)=>{
  let ARR = (order)=> SumArray(order.articles.map(el=> bzCalcVatSum(el).SUM))
  let SUM = (salary)=> SumArray( salary.map( order=> ARR(order) ) )
  if(order){ return ARR(order) }
  return { obj:{ name, sum:SUM(salary), style:{color, fontWeight:"bold", fontSize:"120%"} } }
}
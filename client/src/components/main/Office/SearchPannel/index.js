import React, { useState, useEffect } from "react"

import { DateToYYYYMMDD, nip_sanitize, tel_sanitize } from "../../../../state/functions"
import { Input } from "../../../All/Input"


const SearchPannel = ({ props:{mode, calendar, nip, client, from, to, Fn} })=>{

  const [clientS, setClient] =  useState( false )
  const [nipS, setNip] =        useState( false )
  const [carS, setCar] =        useState( false )
  const [telS, setTel] =        useState( false )
  const [fromS, setFrom] =      useState( false )
  const [toS, setTo] =          useState( false )

  useEffect( ()=>{
    switch(mode){
      case "ZL": break
      case "FS": setFrom(from); setTo(to); break
      default: break
    }
  },[])

  let clientInput = {form:"CLIENT", type:"text", legend:"Client", img:"Search", val:clientS}
  let nipInput =    {form:"NIP", type:"text", legend:"NIP", img:"Search", val:nip_sanitize(nipS)}
  let carInput =    {form:"CAR", type:"text", legend:"Auto", img:"Search", val:carS}
  let telInput =    {form:"TEL", type:"text", legend:"Name / Tel", img:"Search", val:tel_sanitize(telS)}
  let fromInput =   {form:"FROM", type:"date", legend:"Od", val:fromS}
  let toInput =     {form:"TO", type:"date", legend:"Do", val:toS}

  let IsFromOk = (to, val)=> to ? DateToYYYYMMDD(to) >= DateToYYYYMMDD(val) : true
  let IsToOk = (from, val)=> from ? DateToYYYYMMDD(from) <= DateToYYYYMMDD(val) : true

  const SearchFn = (action)=>{

    let val = action.value

    switch(action.type){
      case "CHG_CLIENT":  setClient(val);   break
      case "CHG_NIP":     setNip(val);      break
      case "CHG_CAR":     setCar(val);      break
      case "CHG_TEL":     setTel(val);      break
      case "CHG_FROM":
        if(isNaN(val.year) || isNaN(val.month) || isNaN(val.day)){
          setFrom(false)
          setTo(false)
        }
        IsFromOk(toS, val) && setFrom(val)
        toS && val &&
        Fn({
          type:"SEARCH", from:val,
          to:toS, client:clientS, nip:nipS, car:carS, tel:telS
        })
        break
      case "CHG_TO":
        if(isNaN(val.year) || isNaN(val.month) || isNaN(val.day)){
          setFrom(false)
          setTo(false)
        }
        IsToOk(fromS, val) && setTo(val)
        fromS && val &&
        Fn({
          type:"SEARCH", to:val,
          from:fromS, client:clientS, nip:nipS, car:carS, tel:telS
        })
        break
      case "KEYUP_IMG_CLIENT":
        Fn({type:"SEARCH", from:fromS, to:toS, client:clientS, nip:nipS, car:carS, tel:telS})
        break
      case "KEYUP_IMG_NIP":
        Fn({type:"SEARCH", from:fromS, to:toS, client:clientS, nip:nipS, car:carS, tel:telS})
        break
      case "KEYUP_IMG_TEL":
        Fn({type:"SEARCH", from:fromS, to:toS, client:clientS, nip:nipS, car:carS, tel:telS})
        break
      case "KEYUP_IMG_CAR":
        Fn({type:"SEARCH", from:fromS, to:toS, client:clientS, nip:nipS, car:carS, tel:telS})
        break
      default: break
    }
  }

  return(
    <div className="SearchPannel flex end stretch">
      { mode === "FS" && <Input props={{input:clientInput, Fn:SearchFn}} /> }
      { mode === "FS" && <Input props={{input:nipInput, Fn:SearchFn}} /> }
      { mode === "ZL" && <Input props={{input:carInput, Fn:SearchFn}} /> }
      { mode === "ZL" && <Input props={{input:telInput, Fn:SearchFn}} /> }
      <Input props={{input:fromInput, Fn:SearchFn}} />
      <Input props={{input:toInput, Fn:SearchFn}} />
    </div>
  )
}

export default SearchPannel
import React from 'react'
import './Section2.scss'

import { Input } from './../../Input'


export const Info = ({ props:{printMode, nr, info, name, officeFn} }) => {

  let el = (name === "Sprzedawca" ? "dealer" : "buyer")

  let inputs = [
    {form:`${el}Name`, type:"text", legend:"nazwa firmy", val:(info?.name ? info.name : ""), important:true},
    {form:`${el}ZIP`, type:"text", legend:"kod pocztowy", val:(info?.addr?.zip ? info.addr.zip : ""), important:true},
    {form:`${el}Town`, type:"text", legend:"miejscowość", val:(info?.addr?.town ? info.addr.town : ""), important:true},
    {form:`${el}Street`, type:"text", legend:"ulica", val:(info?.addr?.street ? info.addr.street : ""), important:true},
    {form:`${el}Tel`, type:"text", legend:"numer telefonu", val:(info?.contacts?.tel ? info.contacts.tel : "")},
    {form:`${el}Www`, type:"text", legend:"strona internetowa", val:(info?.contacts?.www ? info.contacts.www : "")},
    {form:`${el}Email`, type:"text", legend:"e-mail", val:(info?.contacts.email ? info?.contacts.email : "")},
    {form:`${el}Acc`, type:"text", legend:"numer konta", val:(info?.account ? info.account : "")},
    {form:`${el}NIP`, type:"text", legend:"NIP", val:(info?.nip ? info.nip : ""), important:true}
  ]

  return(
    <div className={`info${printMode}`} key={`Rect${name}`}>

      <div className="bold">{name}</div>

      { inputs.map( (input, index)=> <Input props={{printMode, nr, input, officeFn}} key={`RectInputs${name}${index}`} /> ) }

    </div>
  )
}
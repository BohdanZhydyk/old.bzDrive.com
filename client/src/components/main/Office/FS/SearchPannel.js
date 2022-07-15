import React from "react"

import { Input } from "../../../All/Input"


export const SearchPannel = ({ props:{nip, client, from, to, invFn} })=>{

  let nipInput =    {form:"NIP", type:"text", legend:"NIP", val:nip}
  let clientInput = {form:"CLIENT", type:"text", legend:"Client", val:client}
  let fromInput =   {form:"FROM", type:"date", legend:"Od", val:from}
  let toInput =     {form:"TO", type:"date", legend:"Do", val:to}

  return(
    <div className="SearchPannel flex end">
      <Input props={{input:nipInput, Fn:invFn}} />
      <Input props={{input:clientInput, Fn:invFn}} />
      <Input props={{input:fromInput, Fn:invFn}} />
      <Input props={{input:toInput, Fn:invFn}} />
    </div>
  )
}
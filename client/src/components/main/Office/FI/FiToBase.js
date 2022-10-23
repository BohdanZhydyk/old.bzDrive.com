import React from "react"

import { Input } from "../../../All/Input"
import ActionBtn from "../../../All/ActionBtn"


export const FiToBase = ({ props:{month, m, FiLogic} })=>{

  let col_9 = month?.col_9 ? month.col_9.net : "0.00"
  let col_10 = month?.col_10 ? month.col_10.net : "0.00"
  let col_14 = month?.col_14 ? month.col_14.net : "0.00"
  let ZU = month?.ZU ? month.ZU.sum : "0.00"

  let col_9_Input = {form:"COL_9", type:"text", legend:"Przychód netto (9)", val:col_9, style:" end"}
  let col_10_Input = {form:"COL_10", type:"text", legend:"Zakup towarów netto (10)", val:col_10, style:" end"}
  let col_14_Input = {form:"COL_14", type:"text", legend:"Wydatki netto (14)", val:col_14, style:" end"}
  let ZU_Input = {form:"ZU", type:"text", legend:"Ubezpieczenie spóleczne ZUS", val:ZU, style:" end"}

  return(
    <div className="FiToBase flex wrap">

      <Input props={{input:col_9_Input, Fn:FiLogic}} />
      <Input props={{input:col_10_Input, Fn:FiLogic}} />
      <Input props={{input:col_14_Input, Fn:FiLogic}} />
      <Input props={{input:ZU_Input, Fn:FiLogic}} />

      <ActionBtn props={{ name:"Save", click:()=>{} }} />
      
    </div>
  )
}
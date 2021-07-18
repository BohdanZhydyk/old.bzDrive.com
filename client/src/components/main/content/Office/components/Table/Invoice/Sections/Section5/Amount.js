import React from 'react'

import { CheckBox } from './CheckBox'


export const Amount = ({ props:{cl, name, data} })=>{

  if( data === "method" ) data = <CheckBox props={{ data:["gotówka","przelew"] }} />
  if( data === "payed" ) data = <CheckBox props={{ data:["zapłacono","data"] }} />

  return(
    <div className={cl}>
      <div className="name flex start">{`${name}:`}</div>
      <div className="data flex start">{data}</div>
    </div>
  )
}
import React from 'react'


export const Theme = ({ props:{item, admin, newsFn} })=>{

  let CHANGE_INPUT = (e)=> newsFn({ type:"CHANGE_INPUT", payload:{nr:"theme", value:e.target.value} })

  return(
    <div className="theme flex start">
    {
      item.edit
      ?
      <input
        className="txtYlw"
        type="text"
        value={item.top.theme}
        onChange={ (e)=> CHANGE_INPUT(e) }
      />
      :
      <div className={`txtYlw flex`}>
        {item.top.theme}
      </div>
    }
    </div>
  )
}
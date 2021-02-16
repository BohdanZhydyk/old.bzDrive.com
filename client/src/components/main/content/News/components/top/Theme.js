import React from 'react'


export const Theme = ({data, fn})=>{
  return(
    <div className="theme flex start">
    {
      data.editMode
      ?
      <input
        className="txtYlw"
        type="text"
        value={data.top.theme}
        onChange={
          (e)=> fn({
            app:"news",
            type:"CHANGE_INPUT",
            payload:{id:data._id, nr:"theme", value:e.target.value} 
          })
        }
      />
      :
      <div className="txtYlw">{data.top.theme}</div>
    }
    </div>
  )
}
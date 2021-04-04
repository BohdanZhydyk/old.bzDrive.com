import React from 'react'


export const AddNews = ({newsFn})=>{

let ADD_NEWS = ()=> newsFn({ type: "ADD_NEWS", payload:true })

  return (
    <div className="container flex txtOrg" onClick={ ()=> ADD_NEWS() } >
      <span>Add News</span>
    </div>
  )
}
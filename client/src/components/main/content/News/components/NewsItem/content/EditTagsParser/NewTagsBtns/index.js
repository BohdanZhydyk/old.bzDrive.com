import React from 'react'
import './NewTagsBtns.scss'


const NewTagsBtns = ({inn, newsFn})=>{

  let ADD_TAG = (inn, tag)=> newsFn({ type:"ADD_TAG", payload:{inn, tag} })

  return(
    <div className="newTagsBtns flex">
      <div className="btn flex" onClick={ ()=> ADD_TAG(inn, "p") } >{`< p >`}</div>
      <div className="btn flex" onClick={ ()=> ADD_TAG(inn, "h4") } >{`< h4 >`}</div>
    </div>
  )
}

export default NewTagsBtns
import React from 'react'

import NewTagsBtns from './NewTagsBtns'


export const EditTagH4 = ({ props:{element, newsFn} })=>{

  let CHANGE_INPUT = (e)=> newsFn({ type:"CHANGE_INPUT", payload:{nr:element.inn, value:e.target.value} })
  
  return (
    <div className="tagWrapper flex column" >

      <input
        className="EditH4 flex"
        type="text"
        value={element.data}
        onChange={ (e)=> CHANGE_INPUT(e) }
      />

      <NewTagsBtns inn={element.inn} newsFn={newsFn} />

    </div>
  )
}
import React from 'react'

import NewTagsBtns from './NewTagsBtns'


export const EditTagP = ({ props:{element, newsFn} })=>{

  let CHANGE_INPUT = (e)=> newsFn({ type:"CHANGE_INPUT", payload:{nr:element.inn, value:e.target.value} })

  return (
    <div className="tagWrapper flex column" >

      <textarea className="EditP" cols="50" rows="5" onChange={ (e)=> CHANGE_INPUT(e) } >
        {element.data}
      </textarea>

      <NewTagsBtns inn={element.inn} newsFn={newsFn} />

    </div>
  )
}
import React from 'react'
import './NewsBottom.scss'


export const NewsBottom = ({ props:{item, admin, newsFn} })=>{

  let EDIT_NEWS = ()=> newsFn({ type: "EDIT_NEWS", payload:item._id })
  let SAVE_NEWS = ()=> newsFn({ type: "SAVE_NEWS", payload:item._id })
  let DELETE_NEWS = ()=> newsFn({ type: "DELETE_NEWS", payload:item._id })
  
  return (
    <div className="newsBottom flex end">

      {
        admin &&
        <>
          {
            item.edit
            ?
            <img
              className="imgBtn"
              onClick={ ()=> SAVE_NEWS() }
              src="https://files.bzdrive.com/img/ico/icoSave.png"
              alt="save"
            />
            :
            <img
              className="imgBtn"
              onClick={ ()=> EDIT_NEWS() }
              src="https://files.bzdrive.com/img/ico/icoEdit.png"
              alt="edit"
            />
          }
          <img
            className="imgBtn"
            onClick={ ()=> DELETE_NEWS() }
            src="https://files.bzdrive.com/img/ico/icoDelete.png"
            alt="delete"
          />
        </>
      }

      <span>{item.bottom.unix}</span>

    </div>
  )
}
import React from 'react'

import { Button } from './Button'


const BtnPannel = ({ props:{item, admin, newsFn} })=>{

  let id = item._id
  let edit = item.edit

  let EDIT_NEWS = ()=> newsFn({ type: "EDIT_NEWS", payload:id })
  let SAVE_NEWS = ()=> newsFn({ type: "SAVE_NEWS", payload:id })
  let DELETE_NEWS = ()=> newsFn({ type: "DELETE_NEWS", payload:id })
  
  return (
    <div className="btnPannel flex end">
    {
      admin &&
      <>

        { edit ? <Button txt={"Save"} func={SAVE_NEWS} /> : <Button txt={"Edit"} func={EDIT_NEWS} /> }

        <Button txt={"Delete"} func={DELETE_NEWS} />

      </>
    }
    </div>
  )
}

export default BtnPannel
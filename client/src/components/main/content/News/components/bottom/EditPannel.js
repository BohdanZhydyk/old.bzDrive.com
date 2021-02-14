import React from 'react'


export const EditPannel = ({data, act})=>{
  return(
    <>
    {
      data.editMode
      ?
      <img className="ImgSmall" src="https://files.bzdrive.com/img/ico/icoSave.png" alt="save"
      onClick={ ()=>act({ type:"EDIT_MODE", payload:{id:data._id, mode:false} }) } />
      :
      <img className="ImgSmall" src="https://files.bzdrive.com/img/ico/icoEdit.png" alt="edit"
      onClick={ ()=>act({ type:"EDIT_MODE", payload:{id:data._id, mode:true} }) } />
    }
    </>
  )
}
import React from "react"


export const BtnsPannel = ({ props:{save, newEl, siteName, link, element, PassFn} })=>{

  let SAVE = ()=> PassFn({type:`SAVE_PASS`, element})
  
  let DELETE = ()=> PassFn({type:`DEL_PASS`, id:element._id})

  return(
    <div className="BtnsPannel flex end">

      {
        link &&
        <a href={link} target="_blank" rel="noreferrer">
          <img
            className="imgBtn flex"
            src="https://old.bzdrive.com/img/ico/newTab.png"
            title="przejść"
            alt="link"
          />
        </a>
      }

      {
        save && siteName?.length > 2 && link?.length > 2 &&
        <img
          className="imgBtn flex"
          src="https://files.bzdrive.com/img/ico/icoSave.png"
          onClick={ ()=> SAVE() }
          title="zapisać"
          alt="save"
        />
      }

      {
        !newEl &&
        <img
          className="imgBtn flex"
          src="https://files.bzdrive.com/img/ico/icoDelete.png"
          onClick={ ()=> DELETE() }
          title="usunąć"
          alt="delete"
        />
      }

    </div>
  )

}
import React, { useState } from "react"


export const BtnsPannel = ({ props:{save, newEl, siteName, link, element, PassFn} })=>{

  const [realy, setRealy] = useState(false)

  let SAVE = ()=> PassFn({type:`SAVE_PASS`, element})

  let DELETE = ()=> PassFn({type:`DEL_PASS`, id:element._id})

  let REALY = ()=> setRealy(true)

  let CANCEL = ()=> setRealy(false)

  return(
    <div className="BtnsPannel flex end">

    {
      !realy
      ?
      <>
        {
          link &&
          <a href={link} target="_blank" rel="noreferrer">
            <img
              className="imgBtn flex"
              src="https://bzdrive.com/files/ico/newTab.png"
              title="przejść"
              alt="link"
            />
          </a>
        }

        {
          save && siteName?.length > 2 && link?.length > 2 &&
          <img
            className="imgBtn flex"
            src="https://bzdrive.com/files/ico/icoSave.png"
            onClick={ ()=> SAVE() }
            title="zapisać"
            alt="save"
          />
        }

        {
          !newEl &&
          <img
            className="imgBtn flex"
            src="https://bzdrive.com/files/ico/icoDelete.png"
            onClick={ ()=> REALY() }
            title="usunąć"
            alt="delete"
          />
        }
      </>
      :
      <>
        <div className="realyBtn grnBtn flex" onClick={ ()=> DELETE() }>
          DELETE
        </div>

        <div className="realyBtn redBtn flex" onClick={ ()=> CANCEL() }>
          CANCEL
        </div>
      </>
    }


    </div>
  )

}
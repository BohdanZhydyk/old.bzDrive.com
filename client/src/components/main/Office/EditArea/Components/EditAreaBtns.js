import React from 'react'

import { bzGetUser } from "../../../../../state/functions"
import ActionBtn from '../../../../All/ActionBtn'


export const EditAreaBtns = ({ props:{mode, status, dealer, id, AreaFn, CANCEL, print, noPrint, DO} })=>{

  let Status = mode === "KL"
    ? `client`
    : status
      ? status
      : `saved`

  let roleOk = ()=> (bzGetUser().role === "admin")
  let userOk = ()=> (bzGetUser().login === dealer.user)

  let SAVE = ()=> AreaFn({ type:"SAVE_DOC", status:Status })
  let DELETE = ()=> AreaFn({ type:"SAVE_DOC", status:`deleted` })
  let PRINT = ()=> AreaFn({ type:"PRINT_DOC" })

  let saved = (status === "saved")
  let edited = (status === "edited")
  let done = (status === "done")
  let deleted = (status === "deleted")

  let errors = true

  let imgBtnPrint = [
    {
      is: print,
      name: "Print",
      click: ()=> DO()
    }
  ]

  let imgBtns = [
    {
      is: ( !deleted && userOk() ) || roleOk(),
      name: ((errors ? "Save" : "Att")),
      click: ()=> (errors ? SAVE() : ()=>{})
    },
    {
      is: !noPrint && (saved || edited || done),
      name: "Print",
      click: ()=> PRINT()
    },
    {
      is: ( saved || edited || done ) && ( userOk() || roleOk() ),
      name: "Delete",
      click: ()=> DELETE()
    },
    {
      is: true,
      name: "Cancel",
      click: ()=> CANCEL()
    }
  ]

  return(
    <div className="editAreaBtns flex end">

      <div className="btns flex">

      {
        (print ? imgBtnPrint : imgBtns).map( (img, i)=>{

          let key = `EditAreaBtn${id}${i}`

          return( img.is && <ActionBtn props={{name:img.name, click:img.click}} key={key}/> )

        })
      }
      </div>

    </div>
  )
}
import React, { useState } from "react"

import {
  CHG_SITENAME, CHG_LINK, CHG_INFO,
  CHG_USERNAME, CHG_LOGIN, CHG_PASS,
  KEYUP_IMG_PASS, DEL_LINE, ADD_LINE
} from "./actions"
import { PassTop } from "./PassTop"
import { InputsPannel } from "./InputsPannel"
import { BtnsPannel } from "./BtnsPannel"
import { InfoPannel } from "./InfoPannel"
import { PassSubEl } from "./PassSubEl"


export const PassEl = ({ props:{el, n, PassFn} })=>{

  const [edit, setEdit] = useState(false)

  const [element, setElement] = useState(el)

  const ElFn = (action)=>{

    setElement( {...element, save:true} )
    
    switch(action.type){
      case "CHG_SITENAME":    CHG_SITENAME(action, element, setElement);      break
      case "CHG_LINK":        CHG_LINK(action, element, setElement);          break
      case "CHG_INFO":        CHG_INFO(action, element, setElement);          break
      case "CHG_USERNAME":    CHG_USERNAME(action, element, setElement);      break
      case "CHG_LOGIN":       CHG_LOGIN(action, element, setElement);         break
      case "CHG_PASS":        CHG_PASS(action, element, setElement);          break
      case "KEYUP_IMG_PASS":  KEYUP_IMG_PASS(action, element, setElement);    break
      case "DEL_LINE":        DEL_LINE(action, element, setElement);          break
      case "ADD_LINE":        ADD_LINE(action, element, setElement);          break
      default: break
    }
  }

  const newEl = element.new
  const save = element.save
  const id = element._id
  const siteName = element?.siteName ? element.siteName : ""
  const link = element?.link ? element.link : ""
  const info = element?.info ? element.info : ""
  const siteData = element.siteData

  // console.log("el"+n, element)

  return(
    <>

      <PassTop props={{el, newEl, edit, setEdit, element, setElement}} />
      
      {
        edit &&
        <div className="EditPannel flex column">

          <div className="SiteData flex wrap stretch">

            <InputsPannel props={{siteName, link, n, ElFn}} />

            <BtnsPannel props={{save, newEl, siteName, link, element, PassFn}} />
            
            <InfoPannel props={{info, ElFn}}/>
          
          </div>

          <div className="SubElData flex column">

            {
              siteData.map( (subEl, k)=>
                <PassSubEl props={{newEl, subEl, id, inputNr:k, ElFn}} key={`PassSubEl${k}`}/>
              )
            }

            <div className="NewBtn flex" title="dodać linię" onClick={ ()=> ElFn({ type:"ADD_LINE" }) }>
              {`add new account`}
            </div>

          </div>
          
        </div>
      }

    </>
  )

}
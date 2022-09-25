import React, { useState } from "react"

import './Settings.scss'
import {
  GET_DEALER, CHG_DEALER_NAME, CHG_DEALER_SHORTNAME, CHG_DEALER_ZIP,
  CHG_DEALER_TOWN, CHG_DEALER_STR, CHG_DEALER_WWW, CHG_DEALER_MAIL,
  CHG_DEALER_TEL, CHG_DEALER_ACC, CHG_DEALER_NIP, CHG_AVA, SAVE_DEALER
} from "./actions"
import Info from "../EditArea/Components/Info"
import ProfileAva from './../../Profile/ProfileAva'
import { BtnsArea } from "./BtnsArea"
import { Hint } from "./Hint"
import { bzGetUser } from "../../../../state/functions"


const Settings = ({ props:{user, ReloadFn} })=>{

  const [dealer, setDealer] = useState(false)

  const [act, setAct] = useState(false)

  let profile = {login:dealer?.shortName, ava:dealer?.img}
  let fileAddr = `files/dealers/`
  let el = {name:"Dealer", title:"Sprzedawca", arr:dealer}

  let oldFile = profile.ava
  let newFile = `${profile.login}_${Date.now()}.png`
  let query = [
    dealer ? {"dealer.shortName":profile.login} : {login:bzGetUser().login},
    {"dealer.img":newFile}
  ]
  let dl = dealer?.shortName ? true : false

  let AreaFn = (action)=>{//console.log(action)
    switch(action.type){
      case "GET_DEALER":            GET_DEALER(action, dealer, setDealer);              break
      case "CHG_DEALER_NAME":       CHG_DEALER_NAME(action, dealer, setDealer);         break
      case "CHG_DEALER_SHORTNAME":  CHG_DEALER_SHORTNAME(action, dealer, setDealer);    break
      case "CHG_DEALER_ZIP":        CHG_DEALER_ZIP(action, dealer, setDealer);          break
      case "CHG_DEALER_TOWN":       CHG_DEALER_TOWN(action, dealer, setDealer);         break
      case "CHG_DEALER_STR":        CHG_DEALER_STR(action, dealer, setDealer);          break
      case "CHG_DEALER_WWW":        CHG_DEALER_WWW(action, dealer, setDealer);          break
      case "CHG_DEALER_MAIL":       CHG_DEALER_MAIL(action, dealer, setDealer);         break
      case "CHG_DEALER_TEL":        CHG_DEALER_TEL(action, dealer, setDealer);          break
      case "CHG_DEALER_ACC":        CHG_DEALER_ACC(action, dealer, setDealer);          break
      case "CHG_DEALER_NIP":        CHG_DEALER_NIP(action, dealer, setDealer);          break

      case "CHG_AVA":               CHG_AVA(action, dealer, setDealer, ReloadFn);       break

      case "SAVE_DEALER":           SAVE_DEALER(dealer, setAct, ReloadFn);            break
      
      default: break
    }
  }

  let LogoFn = (action)=> AreaFn(action)

  // console.log("dealer", dealer)

  return(
    <div className="Settings flex column">
      
      <BtnsArea props={{query, dealer, setDealer, act, setAct, AreaFn}} />

      {
        act &&
        <center className="SettArea flex stretch wrap">

          <ProfileAva props={{query, fileAddr, oldFile, newFile, profile, ProFn:LogoFn, dl}} />

          <Info props={{i:"s", el, AreaFn}} />

          <Hint props={{user}}/>

        </center>
      }

    </div>
  )
}

export default Settings
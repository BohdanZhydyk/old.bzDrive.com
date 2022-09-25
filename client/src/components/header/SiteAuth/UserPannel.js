import React from "react"

import { translate } from './../../../state/translate'


export const UserPannel = ({ props:{user, appFn} })=>{

  let lang = user.lang

  let info = [
    {name:translate(lang, "login"), txt:user.login},
    {name:translate(lang, "role"), txt:user.role},
    {name:translate(lang, "sex"), txt:user.sex},
    {name:translate(lang, "language"), txt:user.lang},
    {name:translate(lang, "e-mail"), txt:user.email}
  ]

  let LOGOUT = ()=> appFn({type:"LOGOUT"})

  let AvaBig = `https://bzdrive.com/files/users/${user.ava ? user.ava : `male.png`}`

  return(
    <div className="userPannel flex wrap stretch">

      <img className="avaBig" src={AvaBig} alt="AvaBig" />

      <div className="userInfo column start">
      {
        info.map( (line, nr)=>{

          let classes = `${line.txt ? `txtWht` : `txtRed`} bold flex start`
          let name = `${line.name}:`
          let txt = line.txt ? line.txt : `false`
          let key = `UserInfoLine${nr}`

          return(
            <div className="userInfoLine flex start" key={key}>
              <span className="txtOrg bold flex end">{name}</span>
              <span className={classes}>{txt}</span>
            </div>
          )
        })
      }
      </div>

      <div className="logOutBtn flex bold" onClick={ ()=> LOGOUT() }>
        <span className="txtRed flex">{ translate(lang, "logoutBtn") }</span>
        <img className="imgBtn" src="https://bzdrive.com/files/ico/icoLogOut.png" alt="logout" />
      </div>

    </div>
  )
}
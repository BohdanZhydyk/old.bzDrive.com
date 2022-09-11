import React, { useState } from 'react'

import { nrErrToTxt, translate } from './../../../state/translate'
import {
  CHG_INPUT,
  TOGGLE_FORM,
  SEND_FORM
} from './actions'


export const AuthPannel = ({ props:{user, appFn} })=>{

  let lang = user.lang

  let login = {name:"login", type:"text", val:"", error:false}
  let pass = {name:"pass", type:"password", val:"", error:false}
  let pass1 = {name:"pass1", type:"password", val:"", error:false}
  let pass2 = {name:"pass2", type:"password", val:"", error:false}
  let email = {name:"email", type:"text", val:"", error:false}

  const [auth, setAuth] = useState([
    { form:"login", inputs:[login, pass], active:true },
    { form:"signin", inputs:[login, email, pass1, pass2] },
    { form:"forgot", inputs:[email, pass1, pass2] }
  ])

	let activeForms = auth.filter( el => el.active )
	let elseForms = auth.filter( el => !el.active )

	let forms = [...activeForms, ...elseForms]
  let form = forms[0].form
	let inputs = forms[0].inputs

  const authFn = (act)=>{
    let type = act.type
    let payload = act.payload
    switch(type){
      case "CHG_INPUT":     CHG_INPUT(payload, form, auth, setAuth);              break
      case "TOGGLE_FORM":   TOGGLE_FORM(payload, auth, setAuth);                  break
      case "SEND_FORM":     SEND_FORM(form, activeForms, auth, setAuth, appFn);   break
      default: break
    }
  }

  console.log('auth', auth)

	return(
		<>
    {
      user?.login
      ? <UserPannel props={{user, appFn}} />
      : <FormPannel props={{inputs, forms, lang, authFn}} />
    }
    </>
	)
}


const UserPannel = ({ props:{user, appFn} })=>{

  let lang = user.lang

  let info = [
    {name:"login", txt:user.login},
    {name:"role", txt:user.role},
    {name:"sex", txt:user.sex},
    {name:"language", txt:user.lang},
    {name:"e-mail", txt:user.email}
  ]

  let LOGOUT = ()=> appFn({type:"LOGOUT"})

  let AvaBig = `https://bzdrive.com/files/users/${user.ava ? user.login : `man`}.png`

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
              <span className="txtOrg flex end">{name}</span>
              <span className={classes}>{txt}</span>
            </div>
          )
        })
      }
      </div>

      <div className="navItem flex" onClick={ ()=> LOGOUT() }>
        <span className="txtRed flex">{ translate(lang, "logoutBtn") }</span>
      </div>

    </div>
  )
}


const FormPannel = ({ props:{inputs, forms, lang, authFn} })=>{

  let KEY_DOWN = (e)=> (e.key === "Enter") && authFn({ type:"SEND_FORM" })

  return(
    <form className="authPannel flex wrap" onKeyDown={ (e)=> KEY_DOWN(e) } >

			<div className="inputs" >
				{
          inputs.map( (input, nr)=>{
            return <Input props={{input, lang, authFn}} key={`Input${input.name}${nr}`} />
          })
        }
			</div>

			<div className="btns flex wrap" >
				{
          forms.map( (btn, nr)=>{
            return <Button props={{btn, lang, authFn}} key={`FormBtn${btn.action}${nr}`} />
          })
        }
			</div>

		</form>
  )
}


const Input =({ props:{input, lang, authFn} })=>{

  let CHG_INPUT = (val)=> authFn({ type:"CHG_INPUT", payload:{...input, val} })

  let nr = input.error
  let ERR = nrErrToTxt(lang, nr)

  let name = translate( lang, `${input.name}Input` )

  return(
    <fieldset className="inputWrapper">

      <legend className="inputName">
        { name }
        { input.error && <span className="txtOrg" >{` - ${ERR}`}</span> }
      </legend>

      <input
        type={input.type} placeholder={name}
        value={input.val} onChange={ (e)=> CHG_INPUT( e.target.value.trim() ) }
      />

    </fieldset>
  )
}


const Button = ({ props:{btn, lang, authFn} })=>{
  
  let active = btn.active
  let form = btn.form
  let inputs = btn.inputs

  let on = false
  for(let i=0; i< inputs.length; i++) if(inputs[i].error) on = true

  let classes = `${active ? (on ? "btnDisActive" :"btnActive") : "btn"} flex`

  let CLICK = ()=> authFn({ type:(active ? (!on && "SEND_FORM") : "TOGGLE_FORM"), payload:form })

  return(
    <span className={classes} onClick={ ()=> CLICK() }>
      { translate(lang, `${form}Btn`) }
    </span>
  )

}
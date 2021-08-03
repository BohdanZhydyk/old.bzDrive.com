import React from 'react'
import './AuthPannel.scss'

import { Input } from './Input'
import { Button } from './Button'


const AuthPannel = ({ props:{auth, lang, fn} })=>{

	let activeForms = auth.forms.filter( el => el.active )
	let elseForms = auth.forms.filter( el => !el.active )
	let forms = [...activeForms, ...elseForms]

	let action = activeForms[0].action
	let inputs = activeForms[0].inputs

	let KeyDwn = (e)=> (e.key === "Enter") && fn({ app:"drive", type:"SEND_FORM", payload:action })

	return(
    <form className="authPannel flex wrap" onKeyDown={ (e)=> KeyDwn(e) } >

			<div className="inputs" >
				{ inputs.map( (input, nr)=> <Input props={{action, input, nr, lang, fn}} /> ) }
			</div>

			<div className="btns flex wrap" >
				{ forms.map( (form,nr)=> <Button props={{form, nr, lang, fn}} /> ) }
			</div>

    </form>
	)
}

export default AuthPannel
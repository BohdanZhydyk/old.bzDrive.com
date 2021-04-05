import React from 'react'
import './AuthPannel.scss'
import { Inputs } from './Inputs'
import { Buttons } from './Buttons'


const AuthPannel = ({auth, lang, fn})=>{

	function enterBtn(){
		for(let i=0; i<auth.forms.length; i++){
			if(auth.forms[i].active){ return auth.forms[i].action }
		}
	}

	return(
    <form className="authPannel flex wrap"
          onKeyDown={ (e)=> (e.key === "Enter") && fn({ app:"drive", type:"SEND_FORM", payload:enterBtn() }) } >
      <Inputs auth={auth} lang={lang} fn={fn} />
      <Buttons auth={auth} lang={lang} fn={fn} />
    </form>
	)
}

export default AuthPannel
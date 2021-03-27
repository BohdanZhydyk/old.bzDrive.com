import React from 'react'
import './AuthPannel.scss'
import { Inputs } from './Inputs'
import { Buttons } from './Buttons'


const AuthPannel = ({auth, fn})=>{

	function enterBtn(){
		for(let i=0; i<auth.forms.length; i++){
			if(auth.forms[i].active){ return auth.forms[i].txt }
		}
	}

	return(
    <form className="authPannel flex wrap"
          onKeyDown={ (e)=> (e.key === "Enter") && fn({ app:"drive", type:"SEND_FORM", payload:enterBtn() }) } >
      <Inputs auth={auth} fn={fn} />
      <Buttons auth={auth} fn={fn} />
    </form>
	)
}

export default AuthPannel
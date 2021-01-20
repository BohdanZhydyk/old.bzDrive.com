import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'

import { Inputs } from './Inputs'
import { Buttons } from './Buttons'


const useStyles = createUseStyles({
	pannel:{
    position:"absolute",
		top:'4vw',
		right:'0.5vw',
		width:"30%",
		padding:'1vw',
		backgroundColor:'#222',
		border:'1px solid #999',
		borderRadius:'0.5vw',
		zIndex:'999'
  }
})

export const AuthPannel = ({auth, fn})=>{

	const styles = useStyles()

	function enterBtn(){
		for(let i=0; i<auth.forms.length; i++){
			if(auth.forms[i].act === "y"){ return auth.forms[i].txt }
		}
	}

	return(
		<>
		{
			auth.active &&
			
			<form className={classNames({ [styles.pannel]:true, 'flex':true, 'wrap':true })}
						onKeyDown={ (e)=> (e.key === "Enter") && fn({ type:"SEND_FORM", payload:enterBtn() }) } >
				<Inputs auth={auth} fn={fn} />
				<Buttons auth={auth} fn={fn} />
			</form>
		}
		</>
	)
}

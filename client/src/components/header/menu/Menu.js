import React from 'react'
import { createUseStyles } from 'react-jss'

import { MenuBtn } from './MenuBtn'
import { AuthPannel } from './../auth/AuthPannel'


const useStyles = createUseStyles({
	headerR:{
		width:'80%'
	},
	avaAuth:{
		border:'1px solid #999',
		borderRadius:'50%'
	},
	headerMenuItems:{
		width:'10%',
		margin:'0 0.5vw',
		minHeight:'1.5vw'
	},
	authPannel:{
		position:"absolute",
		top:'4vw',
		right:'0.5vw',
		width:"40%",
		padding:'1vw',
		backgroundColor:'#222',
		border:'1px solid #999',
		borderRadius:'0.5vw'
	}
})

export const Menu = ({btns, auth, fn})=>{

	const styles = useStyles()

	return(
		<>
		{
			btns
			?
			<div className={styles.headerR + " flex end"} >

				{ btns.map( (btn, index)=> <MenuBtn btn={btn} key={ btn.to + index } /> ) }

				<img className={styles.avaAuth + " imgBtn"} alt="user"
					src="https://files.bzdrive.com/img/users/ava/man.png"
					onClick={ ()=>fn({type:"AUTH_CLICK", payload:auth.active}) } />

				{
					auth.active && <AuthPannel auth={auth} fn={fn} />
				}
				
			</div>
			:
			<div className={styles.headerR + " flex end"} >

				{ [1,2,3,4].map( (item, index)=> <div className={styles.headerMenuItems + " noData"} key={`menuBtn${index}`} ></div> ) }

				<div className="imgBtn noData"></div>
				
			</div>
		}
		</>
	)
}

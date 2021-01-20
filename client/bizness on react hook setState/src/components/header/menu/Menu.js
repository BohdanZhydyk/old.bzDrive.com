import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'

import { MenuBtn } from './MenuBtn'
import { Auth } from './../auth/Auth'


const useStyles = createUseStyles({
	headerR:{
		width:'80%'
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
			<div className={classNames({ [styles.headerR]:true, 'flex':true, 'end':true })} >

				{ btns.map( (btn, index)=> <MenuBtn btn={btn} key={ btn.to + index } /> ) }

				<Auth auth={auth} fn={fn} />
				
			</div>
			:
			<div className={classNames({ [styles.headerR]:true, 'flex':true, 'end':true })} >

				{ [1,2,3,4].map( (item, index)=> <div className={classNames({ [styles.headerMenuItems]:true, 'noData':true })} key={`menuBtn${index}`} ></div> ) }

				<div className="imgBtn noData"></div>
				
			</div>
		}
		</>
	)
}

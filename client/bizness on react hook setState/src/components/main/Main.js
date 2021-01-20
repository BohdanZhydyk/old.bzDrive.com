import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'

import { Routes } from './Routes'


const useStyles = createUseStyles({
	main:{
		minHeight:'60vh',
		margin:'1vw 1vw 2vw 1vw',
		padding:'1vw',
		backgroundColor:'#333',
		borderRadius:'0.5vw'
	},
	filter:{
		width:'100%',
		minHeight:'100%'
	},
	blur:{
		filter:'blur(10px)',
	}
})

export const Main = ({state, handShake, fn})=>{
  
	const styles = useStyles()

	return(
		<main className={styles.main} onClick={ ()=>fn({ type:"TOGGLE_AUTH_PANNEL", payload:true }) } >
		{
			state !== "" &&
			
			<div className={classNames({ [styles.filter]: true, [styles.blur]: state.auth.active })} >
				
				<Routes state={state} handShake={handShake} />

			</div>
		}
		</main>
	)
}

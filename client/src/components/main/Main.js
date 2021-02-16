import React from 'react'
import { Routes } from './Routes'
import './Main.scss'


export const Main = ({state, fn})=>{
	return(
		<>
		{
			!state.initialState
			?
			<main onClick={
				state.drive.auth.active
				? ()=>fn({ app:"drive", type:"TOGGLE_MENU", payload:true })
				: ()=>{return}
			} >
				<div className={ state.drive.auth.active ? "filter-blur" : "filter" } >
					<Routes state={state} fn={fn} />
				</div>
			</main>
			:
			<main className="flex">
				<img className="preload" src="https://files.bzdrive.com/img/Drive/logo/logoDrive.gif" alt="DriveImg" />
			</main>
		}
		</>
		
	)
}

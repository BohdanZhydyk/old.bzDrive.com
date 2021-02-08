import React from 'react'
import { Routes } from './Routes'
import './Main.scss'


export const Main = ({state, fn})=>{
	return(
		<>
		{
			state.auth
			?
			<main onClick={ ()=>fn({ type:"TOGGLE_MENU", payload:true }) } >
				<div className={ state.auth.active ? "filter-blur" : "filter" } >
					<Routes state={state} />
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

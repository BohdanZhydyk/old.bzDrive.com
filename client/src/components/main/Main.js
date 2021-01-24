import React from 'react'
import { Routes } from './Routes'
import './Main.scss'


export const Main = ({state, fn})=>{
	return(
		<main onClick={ ()=>fn({ type:"TOGGLE_AUTH_PANNEL", payload:true }) } >
		{
			state !== "" &&
			
			<div className={ state.auth.active ? "filter-blur" : "filter" } >
				
				<Routes state={state} />

			</div>
		}
		</main>
	)
}

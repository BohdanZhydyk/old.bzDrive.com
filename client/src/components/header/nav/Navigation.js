import React from 'react'
import { NavBtn } from './NavBtn'
import { Menu } from './../menu/Menu'


export const Navigation = ({drive, user, fn})=>{
	return(
		<>
		{
			drive.nav
			?
			<nav className="headerR flex end" >
				{ drive.nav.map( (btn, index)=> <NavBtn btn={btn} key={`navBtn${btn.to}${index}`} /> ) }
				<Menu auth={drive.auth} user={user} fn={fn} />
			</nav>
			:
			<nav className="headerR flex end" >
				{ [1,2,3].map( (item, index)=> <div className="noData noDataTxt" key={`menuBtn${index}`} ></div> ) }
				<div className="noData noDataImg"></div>
			</nav>
		}
		</>
	)
}

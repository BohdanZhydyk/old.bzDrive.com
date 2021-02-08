import React from 'react'
import { NavBtn } from './NavBtn'
import { Menu } from './../menu/Menu'


export const Navigation = ({auth, user, nav, fn})=>{
	return(
		<>
		{
			nav
			?
			<nav className="headerR flex end" >
				{ nav.map( (btn, index)=> <NavBtn btn={btn} key={ btn.to + index } /> ) }
				<Menu auth={auth} user={user} fn={fn} />
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

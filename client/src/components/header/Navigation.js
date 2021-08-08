import React from 'react'
import { NavLink } from 'react-router-dom'

import { translate } from './../../store/translate'

import { ScreenSaver } from '../ScreenSaver'


export const Navigation = ({ props:{nav,user,fn} })=>{

	let obj = (btn, nr)=> {
		return {
			key: `navBtn${btn.to}${nr}`,
			cl: `navItem flex ${btn.active ? 'navItemActive' : '' }`
		}
	}

	let BTN = (to)=> to !== "" && fn({ app: "drive", type: "ACTIVE_NAV_BTN", payload:to })

	return(
		<nav className={`navigation flex end`} >
		{
			nav
			?
			<>
			{
				nav.map( (btn, nr)=>
					<NavLink to={btn.to} className={obj(btn, nr).cl} onClick={ ()=> BTN(btn.to) } key={obj(btn, nr).key} >

						<span className="flex">{ translate(user.lang, btn.name) }</span>

					</NavLink>
				)
			}
			</>
			: <ScreenSaver arr={["Txt","Txt","Txt"]} />
		}
		</nav>
	)
}
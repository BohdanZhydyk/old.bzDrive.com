import React from 'react'
import { NavLink } from 'react-router-dom'

import { translate } from './../../store/translate'


export const NavTop = ({ cl="", nav, lang, fn })=>{

	let obj = (btn, nr)=> {
		return {
			key: `navBtn${btn.to}${nr}`,
			cl: btn.to === "" ? `noData noDataTxt` : `navItem flex ${btn.active ? 'navItemActive' : '' }`,
			cl1: btn.to === "" ? `noData noDataImg` : `flex`
		}
	}

	let BTN = (to)=> to !== "" && fn({ app: "drive", type: "ACTIVE_NAV_BTN", payload:to })

	return(
		<nav className={`navigation flex ${cl} wrap`} >
			{
				nav.map( (btn, nr)=>
					<NavLink to={btn.to} key={obj(btn, nr).key} className={obj(btn, nr).cl} onClick={ ()=> BTN(btn.to) } >

						<span className={obj(btn, nr).cl1}>{translate(lang, btn.name)}</span>

					</NavLink>
				)
			}
		</nav>
	)
}
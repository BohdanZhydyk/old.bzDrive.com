import React from 'react'
import { NavLink } from 'react-router-dom'

import { translate } from './../../store/translate'


export const Navigation = ({nav, lang, fn})=>{

	let ACTIVE_NAV_BTN = (to)=> to !== "" && fn({ app: "drive", type: "ACTIVE_NAV_BTN", payload:to })

	return(
		<nav className="navigation flex end" >
			{
				nav.map( (btn, nr)=>
					<NavLink
						to={btn.to} key={`navBtn${btn.to}${nr}`}
						className={btn.to === "" ? `noData noDataTxt` : `navItem flex${ btn.active ? ' navItemActive' : '' }`}
						onClick={ ()=> ACTIVE_NAV_BTN(btn.to) }
					>

						<span className={btn.to === "" ? `noData noDataImg` : `flex`}>
							{translate(lang, btn.name)}
						</span>

					</NavLink>
				)
			}
		</nav>
	)
}
import React from 'react'
import { NavLink } from 'react-router-dom'


export const Navigation = ({nav, fn})=>{
	return(
		<nav className="navigation flex end" >
			{
				nav.map( (btn, nr)=>
					<NavLink
						to={btn.to} key={`navBtn${btn.to}${nr}`}
						className={btn.to === "" ? `noData noDataTxt` : `navItem flex`}
					>

						<span className={btn.to === "" ? `noData noDataImg` : `flex`}>
							{btn.name}
						</span>

					</NavLink>
				)
			}
		</nav>
	)
}
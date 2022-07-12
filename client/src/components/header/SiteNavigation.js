import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { translate } from '../../state/translate'


export const SiteNavigation = ({ props:{nav, user, appFn} })=>{

	let path = window.location.pathname.split("/")
	let lang = user.lang
	
	useEffect( ()=> appFn({type:"NAV_ACTIVE", payload:{btn:path, show:false} }), [] )

	let CLICK = (btn, side)=>{
		btn && appFn({type:"NAV_ACTIVE", payload:{btn:btn.split("/"), show:true} })
		side && appFn({type:"SIDE_CLICK", payload:{ava:false, menu:false} })
	}

	return(
		<>
		{
			nav.map( (btn, nr)=>{

				let classes = `navBtn ${ btn.active ? `navBtnActive` : `` } flex`
				let key = `navBtn${btn.to}${nr}`

				return(
					<div className={`navItem flex column`} key={key} >

						{
							btn.subnav
							?
							<div className={classes} to={btn.to} onClick={ ()=> CLICK(btn.to, false) } >
								{ translate(lang, btn.name) }
							</div>
							:
							<NavLink className={classes} to={btn.to} onClick={ ()=> CLICK(btn.to, true) } >
								{ translate(lang, btn.name) }
							</NavLink>
						}

						<div className="navSubBtns flex column">
						{
							btn.subnav && btn.show && btn.subnav.map( (subbtn, k)=>{

								let cl = `navSubBtn ${ subbtn.active ? `navSubBtnActive` : `` } flex`
								let subTo = btn.to + subbtn.to
								let key = `navSubBtn${subbtn.to}${k}`

								return(
									<NavLink className={cl} to={subTo} onClick={ ()=> CLICK(subTo, true) } key={key} >
										{ translate(lang, subbtn.name) }
									</NavLink>
								)
							})
						}
						</div>

					</div>
				)
			})
		}
		</>
	)
}
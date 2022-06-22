import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { translate } from '../../state/translate'


export const SiteNavigation = ({ props:{nav, user, appFn} })=>{

	let path = window.location.pathname
	let lang = user.lang

	const navActive = (btn, arr)=>{
		return arr.map( el=>({
				...el,
				active: (el.to === btn) ? true : false,
				show: (el.to === btn) ? !el.show : false
			})
		)
	}

	const [navigation, setNavigation] = useState( navActive(path, nav) )

	let SHOW = (btn)=>{
		setNavigation( navigation.map( el=>( {...el, show: (el.to === btn) ? !el.show : false} ) ) )
	}

	let BTN = (btn)=>{
		SHOW(btn)
		setNavigation( navActive(btn, navigation) )
		appFn({type:"SIDE_CLICK", payload:{ava:false, menu:false} })
	}

	return(
		<>
		{
			navigation.map( (btn, nr)=>{

				let classes = `navBtn ${ btn.active ? `navBtnActive` : `` } flex`
				let key = `navBtn${btn.to}${nr}`

				return(
					<div className={`navItem flex column`} key={key} >

						{
							btn.subnav
							?
							<div className={classes} to={btn.to} onClick={ ()=> SHOW(btn.to) } >
								{ translate(lang, btn.name) }
							</div>
							:
							<NavLink className={classes} to={btn.to} onClick={ ()=> BTN(btn.to) } >
								{ translate(lang, btn.name) }
							</NavLink>
						}

						<div className="navSubBtns flex column">
						{
							btn.subnav && btn.show && btn.subnav.map( (subbtn, k)=>{

								let cl = `navSubBtn ${ subbtn.active ? `navSubBtnActive` : `` } flex`
								let key = `navSubBtn${subbtn.to}${k}`

								return(
									<NavLink className={cl} to={btn.to + subbtn.to} onClick={ ()=> BTN(btn.to) } key={key} >
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
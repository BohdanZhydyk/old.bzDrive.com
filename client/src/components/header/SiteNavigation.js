import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { translate } from '../../state/translate'


export const SiteNavigation = ({ props:{nav, user, appFn} })=>{

	let path = window.location.pathname
	let lang = user.lang

	const navActive = (to, arr)=>{
		return(
			arr.map( el => (el.to === to) ? {...el, active:true} : {...el, active:false} )
		)
	}

	const [navigation, setNavigation] = useState( navActive(path, nav) )

	let BTN = (to)=>{
		setNavigation( navActive(to, navigation) )
		appFn({type:"SIDE_CLICK", payload:{ava:false, menu:false} })
	}

	return(
		<>
		{
			navigation.map( (btn, nr)=>{

				let key = `navBtn${btn.to}${nr}`
				let classes = `navItem flex ${ btn.active ? 'navItemActive' : '' }`

				return(
					<NavLink className={classes} to={btn.to} onClick={ ()=> BTN(btn.to) } key={key} >

						<span className="flex">{ translate(lang, btn.name) }</span>

					</NavLink>
				)
			})
		}
		</>
	)
}
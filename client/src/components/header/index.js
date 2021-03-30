import React from 'react'
import './Header.scss'
import { Logo } from './Logo'
import { Navigation } from './Navigation'
import Auth from './Auth'


const Header = ({state, fn})=>{

	let nav = state.drive.nav.map( (item, index)=>{ return {name:item.name, to:item.to, active:item.active} })
	let info = state.drive.info
	let auth = state.drive.auth
	let user = state.user

	return(
		<header className="flex" >
			<Logo info={info} />
			<Navigation nav={nav} fn={fn} />
			<Auth auth={auth} user={user} fn={fn} />
		</header>
	)
}

export default Header
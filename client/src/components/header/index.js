import React from 'react'
import './Header.scss'
import { Logo } from './Logo'
import { Navigation } from './Navigation'
import { Language } from './Language'
import Auth from './Auth'


const Header = ({state, fn})=>{

	let info = state.drive.info
	let auth = state.drive.auth
	let user = state.user
	let nav = state.drive.nav.map( (item, index)=>{ return {name:item.name, to:item.to, role:item.role, active:item.active} })
	let lang = user.lang

	switch(user.role){
		case "user":
			nav = nav.filter( (item)=> item.role !== "admin" )
			break
		case "guest":
			nav = nav.filter( (item)=> item.role !== "user" && item.role !== "admin" )
			break
		default: break
	}

	return(
		<header className="flex" >
			<Logo info={info} />
			<Navigation nav={nav} lang={lang} fn={fn} />
			<Language lang={lang} />
			<Auth auth={auth} lang={lang} user={user} fn={fn} />
		</header>
	)
}

export default Header
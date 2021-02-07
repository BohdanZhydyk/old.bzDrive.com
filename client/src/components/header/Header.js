import React from 'react'
import './Header.scss'
import { Logo } from './logo/Logo'
import { Navigation } from './nav/Navigation'


export const Header = ({projects, auth, user, nav, fn})=>{
	return(
		<header className="flex" >
			<Logo projects={projects} />
			<Navigation auth={auth} user={user} nav={nav} fn={fn} />
		</header>
	)
}

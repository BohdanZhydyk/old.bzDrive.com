import React from 'react'
import './Header.scss'
import { Logo } from './logo/Logo'
import { Navigation } from './nav/Navigation'


export const Header = ({project, auth, user, fn})=>{
	return(
		<header className="flex" >
			<Logo project={project} />
			<Navigation btns={project.btns} auth={auth} user={user} fn={fn} />
		</header>
	)
}

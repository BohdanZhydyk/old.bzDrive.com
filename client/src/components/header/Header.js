import React from 'react'
import './Header.scss'
import { Logo } from './logo/Logo'
import { Menu } from './menu/Menu'


export const Header = ({project, auth, user, fn})=>{
	return(
		<header className="flex" >
			<Logo project={project} />
			<Menu btns={project.btns} auth={auth} user={user} fn={fn} />
		</header>
	)
}

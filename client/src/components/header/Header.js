import React from 'react'
import './Header.scss'
import { Logo } from './logo/Logo'
import { Navigation } from './nav/Navigation'


export const Header = ({drive, user, fn})=>{
	return(
		<header className="flex" >
			<Logo project={drive.copy.project} />
			<Navigation drive={drive} user={user} fn={fn} />
		</header>
	)
}

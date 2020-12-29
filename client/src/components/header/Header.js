import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'

import { Logo } from './logo/Logo'
import { Menu } from './menu/Menu'


const useStyles = createUseStyles({
	header:{
		padding:'0 2vw',
		borderTop:'2px solid #999',
		borderBottom:'2px solid #999',
		backgroundImage:'linear-gradient(#111e,#000e,#3339)'
	}
})

export const Header = ({project, auth, fn})=>{

	const styles = useStyles()

	return(
		<header className={classNames({ [styles.header]:true, 'flex':true })} >
			<Logo project={project} />
			<Menu btns={project.btns} auth={auth} fn={fn} />
		</header>
	)
}

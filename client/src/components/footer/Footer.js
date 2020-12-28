import React from 'react'
import { createUseStyles } from 'react-jss'

import { FooterTop } from './FooterTop'
import { FooterBottom } from './FooterBottom'


const useStyles = createUseStyles({
	footer:{
		padding:'0',
		borderTop:'2px solid #999',
		borderBottom:'2px solid #999',
	}
})

export const Footer = ({projects, copyright})=>{

	const styles = useStyles()

	return(
		<footer className={styles.footer}>
			<FooterTop projects={projects} />
			<FooterBottom copyright={copyright} />
		</footer>
	)
}

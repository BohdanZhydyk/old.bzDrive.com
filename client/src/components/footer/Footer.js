import React from 'react'
import './Footer.scss'
import { FooterTop } from './FooterTop/FooterTop'
import { FooterBottom } from './FooterBottom/FooterBottom'


export const Footer = ({projects, copyright})=>{
	return(
		<footer>
			<FooterTop projects={projects} />
			<FooterBottom copyright={copyright} />
		</footer>
	)
}

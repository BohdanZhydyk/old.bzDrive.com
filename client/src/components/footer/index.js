import React from 'react'
import './Footer.scss'

import { ContactsPannel } from './ContactsPannel'
import { Copyright } from './Copyright'


const Footer = ({state})=>{

	let info = state.drive.info

	return(
		<footer className="flex">
			<ContactsPannel info={info} />
			<Copyright info={info} />
		</footer>
	)
}

export default Footer
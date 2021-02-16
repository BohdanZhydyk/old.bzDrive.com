import React from 'react'
import './Footer.scss'

import { ContactsPannel } from './ContactsPannel'
import { Copyright } from './Copyright'


export const Footer = ({copy})=>{
	return(
		<footer className="flex">
			<ContactsPannel contacts={copy.contacts} />
			<Copyright data={copy} />
		</footer>
	)
}

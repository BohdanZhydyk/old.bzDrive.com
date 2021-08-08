import React from 'react'
import './Footer.scss'

import { Contacts } from './Contacts'
import { Copyright } from './Copyright'


const Footer = ({state,fn})=>{

	let cont = state?.drive?.info?.contacts ? state?.drive?.info?.contacts : false
	let cop = state?.drive?.info ? state?.drive?.info : false

	return(
		<footer className="flex between wrap">

			<Contacts props={{cont}} />

			<Copyright props={{cop}} />
			
		</footer>
	)
}

export default Footer
import React, { useState, useEffect } from 'react'
import './Footer.scss'

import { bzPost } from './../../store/functions'

import { Contacts } from './Contacts'
import { Copyright } from './Copyright'


const Footer = ()=>{

	const [footer, setFooter] = useState(false)

  useEffect( ()=>{
		!footer &&
		bzPost("/drive", { getState:true }, (data)=>{
			setFooter({
				contacts:data.info.contacts,
				author:data.info.author,
				link:data.info.link
			})
		})
	},[])

  console.log('footer', footer)

	let contacts = footer?.contacts ? footer?.contacts : false
	let author = footer?.author ? footer?.author : false
	let link = footer?.link ? footer?.link : false

	return(
		<footer className="flex between wrap">

			<Contacts props={{contacts}} />

			<Copyright props={{author, link}} />
			
		</footer>
	)
}

export default Footer
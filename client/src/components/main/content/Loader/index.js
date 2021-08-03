import React from 'react'
import './index.scss'


const Loader = ()=>{

	let src = `https://files.bzdrive.com/img/Drive/logo/logoDrive.gif`

	return(
		<main className="flex">

			<img className="preload" src={src} alt="DriveImg" />
			
		</main>
	)
}

export default Loader
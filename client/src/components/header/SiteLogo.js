import React from 'react'


export const SiteLogo = ({ props:{info} })=>{

	let org = false

	return(
		<>
			<img className="imgBtn flex" src={info.img} alt={info.name} />
			<span className="flex">
			{
				info.link.map( (el, i)=>{
					org = !org
					let key = Math.random(1000000000)
					return <span className={org ? `txtOrg` : `txtWht`} key={key}>{el}</span>
				})
			}
			</span>
		</>
	)
}
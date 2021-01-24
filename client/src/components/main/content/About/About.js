import React from 'react'
import './About.scss'


export const About = ({handShake})=>{
	return(
		handShake
		?
		<div>
			<div className="margin">{`ID: ${handShake.ID}`}</div>
			<div className="margin">
				<div>{`ip: ${handShake.IP.ip}`}</div>
				<span>{` ${handShake.IP.code},`}</span>
				<span>{` ${handShake.IP.country},`}</span>
				<span>{` ${handShake.IP.region},`}</span>
				<span>{` ${handShake.IP.zip},`}</span>
				<span>{` ${handShake.IP.city},`}</span>
				<span>{` ${handShake.IP.name},`}</span>
			</div>
			<div className="margin">
				<div>{`ava: ${handShake.USER.ava}`}</div>
				<div>{`email: ${handShake.USER.email}`}</div>
				<div>{`lang: ${handShake.USER.lang}`}</div>
				<div>{`name: ${handShake.USER.name}`}</div>
				<div>{`role: ${handShake.USER.role}`}</div>
				<div>{`sex: ${handShake.USER.sex}`}</div>
			</div>

			<button>start</button>
		</div>
		:
		<div></div>
	)
}

export default About
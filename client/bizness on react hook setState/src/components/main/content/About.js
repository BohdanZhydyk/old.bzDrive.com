import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'


const useStyles = createUseStyles({
	margin:{
		margin:'1vw'
	}
})

export const About = ({handShake})=>{

	const styles = useStyles()

	const [data, setData] = useState()

	return(
		<div>
			<div className={styles.margin}>{`ID: ${handShake.ID}`}</div>
			<div className={styles.margin}>
				<div>{`ip: ${handShake.IP.ip}`}</div>
				<span>{` ${handShake.IP.code},`}</span>
				<span>{` ${handShake.IP.country},`}</span>
				<span>{` ${handShake.IP.region},`}</span>
				<span>{` ${handShake.IP.zip},`}</span>
				<span>{` ${handShake.IP.city},`}</span>
				<span>{` ${handShake.IP.name},`}</span>
			</div>
			<div className={styles.margin}>
				<div>{`ava: ${handShake.USER.ava}`}</div>
				<div>{`email: ${handShake.USER.email}`}</div>
				<div>{`lang: ${handShake.USER.lang}`}</div>
				<div>{`name: ${handShake.USER.name}`}</div>
				<div>{`role: ${handShake.USER.role}`}</div>
				<div>{`sex: ${handShake.USER.sex}`}</div>
			</div>

			<button>start</button>
		</div>
	)
}

export default About
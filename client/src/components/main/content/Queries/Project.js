import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'


const useStyles = createUseStyles({
	queryProject:{
		width:'90%',
		minHeight:'2vw',
		margin:'0.5vw 0',
		padding:'0 1vw',
		backgroundColor:'#111',
		border:'0.1vw solid #999',
		borderRadius:'0.5vw'
	},
	queryQueries:{
		margin:'0 0 2vw 0'
	},
	queryLine:{
		width:'85%',
		margin:'0.5vw',
		padding:'0.2vw 0.5vw',
		borderRadius:'0.5vw',
		'&:hover':{
			border:'0.1vw solid #fff'
		},
	},
	queryMethod:{
		width:'4vw',
		padding:'0 0.5vw',
		margin:'0 1vw 0 0'
	},
	queryLink:{}
})

const queries = [
	{"method": "GET", "link": ""},
	{"method": "POST", "link": ""},
	{"method": "UPDATE", "link": ""},
	{"method": "DELETE", "link": ""}
]

export const Project = ({project})=>{

  const styles = useStyles()

	let link = "https://"+project.link[0]+project.link[1]+project.link[2]+project.link[3]

	return(
		<div>
			<div className={classNames({ [styles.queryProject]:true, 'flex':true, 'start':true })} >{ link }</div>
			<div className={styles.queryQueries} >
				{
					queries.map( (query, index)=>{
						return(
							<div className={classNames({ [styles.queryLine]:true, [`color${ query.method }`]:true, 'flex':true, 'start':true })} key={ link+query.method+query.link + index } >
								<div className={classNames({ [styles.queryMethod]:true, [`color${ query.method }`]:true })} >{ query.method }</div>
								<div className={styles.queryLink} >
									{ query.link }
								</div>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default Project
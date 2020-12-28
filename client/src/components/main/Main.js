import React from 'react'
import { createUseStyles } from 'react-jss'

import { Switch, Route } from 'react-router-dom'
import { Queries } from './content/Queries/Queries'
import { Contacts } from './content/Contacts'
import { About } from './content/About'


const useStyles = createUseStyles({
	main:{
		minHeight:'60vh',
		margin:'1vw 1vw 2vw 1vw',
		padding:'1vw',
		backgroundColor:'#333',
		borderRadius:'0.5vw'
	},
	filter:{
		width:'100%',
		minHeight:'100%'
	},
	blur:{
		filter:'blur(10px)',
	}
})

export const Main = ({state})=>{
  
  const styles = useStyles()

	return(
		// <main className={} >
		<main className={styles.main} >
		{
			state !== "" &&
			<div className={state.auth.active ? styles.filter +" "+ styles.blur : styles.filter} >
				<Switch>
						<Route exact path="/"><Queries state={ state } /></Route>				
						<Route path="/contacts"	><Contacts /></Route>
						<Route path="/about"	><About /></Route>
				</Switch>
			</div>
		}
		</main>
	)
}

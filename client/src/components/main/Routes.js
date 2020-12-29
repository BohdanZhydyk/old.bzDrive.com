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

export const Routes = ({state, fn})=>{
  
  const styles = useStyles()

	return(

    <Switch>

        <Route exact path="/" component={ ()=> <Queries state={ state } /> } />
        <Route path="/contacts" component={ ()=> <Contacts /> }	/>
        <Route path="/about" component={ ()=> <About /> }	/>

    </Switch>

	)
}

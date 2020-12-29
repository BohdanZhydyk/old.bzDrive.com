import React from 'react'

import { Switch, Route } from 'react-router-dom'
import { Queries } from './content/Queries/Queries'
import { Contacts } from './content/Contacts'
import { About } from './content/About'



export const Routes = ({state, fn})=>{
	return(

    <Switch>

        <Route exact path="/" component={ ()=> <Queries state={ state } /> } />
        <Route path="/contacts" component={ ()=> <Contacts /> }	/>
        <Route path="/about" component={ ()=> <About /> }	/>

    </Switch>

	)
}

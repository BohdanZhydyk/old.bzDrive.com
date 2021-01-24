import React from 'react'

import { Switch, Route } from 'react-router-dom'
import { Documentation } from './content/Documentation/Documentation'
import { Contacts } from './content/Contacts/Contacts'
import { About } from './content/About/About'


export const Routes = ({state, fn})=>{
	return(

    <Switch>

        <Route exact path="/" component={ ()=> <Documentation state={ state } /> } />
        <Route path="/contacts" component={ ()=> <Contacts /> } />
        <Route path="/about" component={ ()=> <About handShake={state.auth.handShake} /> }	/>

    </Switch>

	)
}

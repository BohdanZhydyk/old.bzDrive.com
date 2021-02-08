import React from 'react'

import { Switch, Route } from 'react-router-dom'
import { Home } from './content/Home/Home'
import { Api } from './content/Api/Api'
import { Contacts } from './content/Contacts/Contacts'
import { About } from './content/About/About'


export const Routes = ({state, fn})=>{
	return(

    <Switch>

        <Route exact path="/" component={ ()=> <Home state={ state } /> } />
        <Route exact path="/api" component={ ()=> <Api state={ state } /> } />
        <Route path="/contacts" component={ ()=> <Contacts /> } />
        <Route path="/about" component={ ()=> <About handShake={state.auth.handShake} /> }	/>

    </Switch>

	)
}

import React, { useState } from 'react'
import { HashRouter } from 'react-router-dom'

import { initialState } from './store/initialState'
import { drive } from './store/actions/drive'
import { news } from './store/actions/news'
import { cv } from './store/actions/cv'

import { Header } from './components/header/Header'
import { Main } from './components/main/Main'
import { Footer } from './components/footer/Footer'


function App(){

	const [state, setState] = useState(initialState)

	const fn = (action)=>{
		switch(action.app){
			case "drive":		drive(action, state, setState);	break
			case "news":		news(action, state, setState);	break
			case "cv":			cv(action, state, setState);		break
			default: break
		}
	}

	if( state.initialState === true ){ fn({ app:"drive", type:"GET_STATE" }) }

	console.log('state', state)

	return(
		<HashRouter>
			
			<Header drive={state.drive} user={state.user} fn={fn} />
		
			<Main state={state} fn={fn} />
		
			<Footer copy={state.drive.copy} />
			
		</HashRouter>
	)
}

export default App;

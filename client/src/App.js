import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Header } from './components/header/Header'
import { Main } from './components/main/Main'
import { Footer } from './components/footer/Footer'


function App({state, fn}){

	console.log('state', state)

	return(
		<>
		<BrowserRouter>
			
			<Header project={state === "" ? false : state.projects[0]} auth={state.auth} user={state.USER} fn={fn} />
		
			<Main state={state} fn={fn} />
		
			<Footer projects={state.projects ? state.projects : false} copyright={state.copyright ? state.copyright : false} />
			
		</BrowserRouter>
		</>
	)
}

export default App;
